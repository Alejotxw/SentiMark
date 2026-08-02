from typing import Optional

from fastapi import APIRouter, HTTPException
from firebase_admin import firestore

from app.firebase import get_db
from app.models import Mention, MentionCreate, MentionUpdate, Sentiment

router = APIRouter(prefix="/api/mentions", tags=["mentions"])

COLLECTION = "mentions"


def _to_mention(doc) -> Mention:
    data = doc.to_dict()
    return Mention(id=doc.id, **data)


@router.get("", response_model=list[Mention])
def list_mentions(
    sentiment: Optional[Sentiment] = None,
    platform: Optional[str] = None,
    limit: int = 50,
):
    query = get_db().collection(COLLECTION)
    if sentiment is not None:
        query = query.where("sentiment", "==", sentiment.value)
    if platform is not None:
        query = query.where("platform", "==", platform)
    query = query.order_by("created_at", direction=firestore.Query.DESCENDING).limit(limit)
    return [_to_mention(doc) for doc in query.stream()]


@router.get("/{mention_id}", response_model=Mention)
def get_mention(mention_id: str):
    doc = get_db().collection(COLLECTION).document(mention_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Mention not found")
    return _to_mention(doc)


@router.post("", response_model=Mention, status_code=201)
def create_mention(payload: MentionCreate):
    data = payload.model_dump()
    data["sentiment"] = payload.sentiment.value
    data["created_at"] = firestore.SERVER_TIMESTAMP
    _, doc_ref = get_db().collection(COLLECTION).add(data)
    return _to_mention(doc_ref.get())


@router.put("/{mention_id}", response_model=Mention)
def update_mention(mention_id: str, payload: MentionUpdate):
    doc_ref = get_db().collection(COLLECTION).document(mention_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Mention not found")

    updates = payload.model_dump(exclude_unset=True)
    if "sentiment" in updates and updates["sentiment"] is not None:
        updates["sentiment"] = updates["sentiment"].value
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")

    doc_ref.update(updates)
    return _to_mention(doc_ref.get())


@router.delete("/{mention_id}", status_code=204)
def delete_mention(mention_id: str):
    doc_ref = get_db().collection(COLLECTION).document(mention_id)
    if not doc_ref.get().exists:
        raise HTTPException(status_code=404, detail="Mention not found")
    doc_ref.delete()
