"""Loads the trained sentiment pipeline and runs inference.

The model is produced by Entreno/train_sentiment_model.py (TF-IDF +
LogisticRegression, scikit-learn) and saved to app/ml/model/sentiment_model.joblib.
"""

from functools import lru_cache
from pathlib import Path

import joblib

from app.models import Sentiment

MODEL_PATH = Path(__file__).resolve().parent / "model" / "sentiment_model.joblib"


class ModelNotFoundError(RuntimeError):
    pass


@lru_cache(maxsize=1)
def _get_pipeline():
    if not MODEL_PATH.exists():
        raise ModelNotFoundError(
            f"Sentiment model not found at {MODEL_PATH}. "
            "Run Entreno/train_sentiment_model.py to generate it."
        )
    return joblib.load(MODEL_PATH)


def predict_sentiment(text: str) -> tuple[Sentiment, dict[str, float]]:
    pipeline = _get_pipeline()
    proba = pipeline.predict_proba([text])[0]
    scores = dict(zip(pipeline.classes_, (float(p) for p in proba)))
    predicted = pipeline.classes_[proba.argmax()]

    return Sentiment(predicted), scores
