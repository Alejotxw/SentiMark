"""
Train the SentiMark sentiment classifier from the raw comment dataset.

Input:  Entreno/Parquet/*.parquet  (columns: comentario, estado, ...)
Output: Backend/app/ml/model/sentiment_model.joblib
        Entreno/training_report.txt

Usage:
    python train_sentiment_model.py
"""

import glob
import time
from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

ROOT = Path(__file__).resolve().parent.parent
PARQUET_DIR = ROOT / "Entreno" / "Parquet"
MODEL_OUT = ROOT / "Backend" / "app" / "ml" / "model" / "sentiment_model.joblib"
REPORT_OUT = ROOT / "Entreno" / "training_report.txt"

# estado (Spark dataset label) -> Sentiment enum used by the FastAPI backend
LABEL_MAP = {
    "positiva": "positive",
    "negativo": "negative",
    "neutro": "neutral",
}


def load_dataset() -> pd.DataFrame:
    files = sorted(glob.glob(str(PARQUET_DIR / "*.parquet")))
    if not files:
        raise FileNotFoundError(f"No .parquet files found in {PARQUET_DIR}")

    frames = []
    for f in files:
        df = pd.read_parquet(f, columns=["comentario", "estado"])
        frames.append(df)
    df = pd.concat(frames, ignore_index=True)

    normalized_estado = df["estado"].str.strip().str.lower()
    df["sentiment"] = normalized_estado.map(LABEL_MAP)

    unmapped = sorted(normalized_estado[df["sentiment"].isna()].unique())
    if unmapped:
        print(f"  dropping {df['sentiment'].isna().sum():,} rows with unrecognized estado values: {unmapped}")

    df = df.dropna(subset=["comentario", "sentiment"])
    df = df[df["comentario"].str.strip() != ""]
    df = df.drop_duplicates(subset=["comentario", "sentiment"])
    return df[["comentario", "sentiment"]]


def main() -> None:
    t0 = time.time()
    print("Loading dataset...")
    df = load_dataset()
    print(f"  {len(df):,} rows after cleaning/dedup ({time.time() - t0:.1f}s)")
    print(df["sentiment"].value_counts())

    X_train, X_test, y_train, y_test = train_test_split(
        df["comentario"],
        df["sentiment"],
        test_size=0.1,
        stratify=df["sentiment"],
        random_state=42,
    )

    pipeline = Pipeline(
        [
            (
                "tfidf",
                TfidfVectorizer(
                    max_features=100_000,
                    ngram_range=(1, 2),
                    min_df=2,
                    strip_accents="unicode",
                    sublinear_tf=True,
                ),
            ),
            (
                "clf",
                LogisticRegression(
                    max_iter=1000,
                    class_weight="balanced",
                    solver="lbfgs",
                    n_jobs=-1,
                ),
            ),
        ]
    )

    print("\nFitting on train split...")
    t1 = time.time()
    pipeline.fit(X_train, y_train)
    print(f"  fit done in {time.time() - t1:.1f}s")

    print("\nEvaluating on held-out test split...")
    y_pred = pipeline.predict(X_test)
    report = classification_report(y_test, y_pred, digits=3)
    cm = confusion_matrix(y_test, y_pred, labels=["positive", "neutral", "negative"])
    print(report)
    print("Confusion matrix (rows=true, cols=pred) [positive, neutral, negative]:")
    print(cm)

    REPORT_OUT.write_text(
        "SentiMark sentiment classifier - training report\n"
        f"Rows: {len(df):,} | train={len(X_train):,} test={len(X_test):,}\n\n"
        f"{report}\n"
        "Confusion matrix (rows=true, cols=pred) [positive, neutral, negative]:\n"
        f"{cm}\n",
        encoding="utf-8",
    )
    print(f"\nWrote report to {REPORT_OUT}")

    print("\nRefitting on full dataset for the production artifact...")
    t2 = time.time()
    pipeline.fit(df["comentario"], df["sentiment"])
    print(f"  refit done in {time.time() - t2:.1f}s")

    MODEL_OUT.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, MODEL_OUT)
    print(f"\nSaved model to {MODEL_OUT}")
    print(f"Total time: {time.time() - t0:.1f}s")


if __name__ == "__main__":
    main()
