from fastapi import APIRouter

from app.firebase import get_db
from app.models import (
    OverviewMetric,
    SentimentDistributionSlice,
    SentimentTrendPoint,
    TopicAnalysis,
)

router = APIRouter(prefix="/api/metrics", tags=["metrics"])

COLLECTION = "metrics"


def _get_items(doc_id: str) -> list[dict]:
    doc = get_db().collection(COLLECTION).document(doc_id).get()
    return doc.to_dict().get("items", []) if doc.exists else []


def _set_items(doc_id: str, items: list[dict]) -> None:
    get_db().collection(COLLECTION).document(doc_id).set({"items": items})


@router.get("/overview", response_model=list[OverviewMetric])
def get_overview_metrics():
    return _get_items("overview")


@router.put("/overview", response_model=list[OverviewMetric])
def set_overview_metrics(items: list[OverviewMetric]):
    payload = [item.model_dump() for item in items]
    _set_items("overview", payload)
    return payload


@router.get("/sentiment-trend", response_model=list[SentimentTrendPoint])
def get_sentiment_trend():
    return _get_items("sentiment_trend")


@router.put("/sentiment-trend", response_model=list[SentimentTrendPoint])
def set_sentiment_trend(items: list[SentimentTrendPoint]):
    payload = [item.model_dump() for item in items]
    _set_items("sentiment_trend", payload)
    return payload


@router.get("/sentiment-distribution", response_model=list[SentimentDistributionSlice])
def get_sentiment_distribution():
    return _get_items("sentiment_distribution")


@router.put("/sentiment-distribution", response_model=list[SentimentDistributionSlice])
def set_sentiment_distribution(items: list[SentimentDistributionSlice]):
    payload = [item.model_dump() for item in items]
    _set_items("sentiment_distribution", payload)
    return payload


@router.get("/topics", response_model=list[TopicAnalysis])
def get_topics():
    return _get_items("topics")


@router.put("/topics", response_model=list[TopicAnalysis])
def set_topics(items: list[TopicAnalysis]):
    payload = [item.model_dump() for item in items]
    _set_items("topics", payload)
    return payload
