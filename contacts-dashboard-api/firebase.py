import os
import firebase_admin
from firebase_admin import credentials, firestore

_initialized = False


def get_db():
    global _initialized
    if not _initialized:
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
        if not cred_path:
            raise RuntimeError("FIREBASE_CREDENTIALS_PATH env var not set")
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        _initialized = True
    return firestore.client()


db = get_db()
