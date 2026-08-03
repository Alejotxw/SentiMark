from fastapi import APIRouter, HTTPException

from app.ml.sentiment import ModelNotFoundError, predict_sentiment
from app.models import SentimentPredictionRequest, SentimentPredictionResponse

router = APIRouter(prefix="/api/sentiment", tags=["sentiment"])


@router.post("/predict", response_model=SentimentPredictionResponse)
def predict(payload: SentimentPredictionRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=422, detail="text must not be empty")

    try:
        sentiment, scores = predict_sentiment(payload.text)
    except ModelNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    return SentimentPredictionResponse(sentiment=sentiment, scores=scores)
