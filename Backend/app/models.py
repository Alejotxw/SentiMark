from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class Sentiment(str, Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"


class Trend(str, Enum):
    up = "up"
    down = "down"


class MentionBase(BaseModel):
    user: str
    avatar: str
    content: str
    sentiment: Sentiment
    platform: str


class MentionCreate(MentionBase):
    pass


class MentionUpdate(BaseModel):
    user: Optional[str] = None
    avatar: Optional[str] = None
    content: Optional[str] = None
    sentiment: Optional[Sentiment] = None
    platform: Optional[str] = None


class Mention(MentionBase):
    id: str
    created_at: datetime


class OverviewMetric(BaseModel):
    title: str
    value: str
    change: str
    trend: Trend


class SentimentTrendPoint(BaseModel):
    name: str
    positive: int
    neutral: int
    negative: int


class SentimentDistributionSlice(BaseModel):
    name: str
    value: int
    color: str


class TopicAnalysis(BaseModel):
    topic: str
    sentiment: int


class SentimentPredictionRequest(BaseModel):
    text: str = Field(max_length=5000)


class SentimentPredictionResponse(BaseModel):
    sentiment: Sentiment
    scores: dict[str, float]
