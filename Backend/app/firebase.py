from functools import lru_cache

import firebase_admin
from firebase_admin import credentials, firestore

from app.config import GOOGLE_APPLICATION_CREDENTIALS


@lru_cache
def get_db():
    if not firebase_admin._apps:
        cred = credentials.Certificate(GOOGLE_APPLICATION_CREDENTIALS)
        firebase_admin.initialize_app(cred)
    return firestore.client()
