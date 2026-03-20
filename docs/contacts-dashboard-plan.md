# Contacts Dashboard — Implementation Plan

## Goal

Build a private, minimal dashboard to read and manage messages submitted
through the portfolio contact form. Messages are stored in the Firestore
`contacts` collection.

---

## Architecture

```
Firestore (contacts collection)
        |
        | firebase-admin SDK
        v
  FastAPI (Python) — private REST API
        |
        | HTTP GET /contacts
        v
  React dashboard (future, optional)
```

---

## Backend — FastAPI + firebase-admin

### Stack

- Python 3.11+
- FastAPI
- firebase-admin (official Python SDK)
- uvicorn (ASGI server)

### Authentication

Firebase Admin SDK authenticates via a **service account key** (JSON file
downloaded from Firebase Console > Project Settings > Service Accounts).
This key is never exposed to the client.

The API itself is protected with a static `Authorization: Bearer <token>`
header. Token is set as an environment variable.

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /contacts | Returns all contact submissions, ordered by createdAt desc |
| GET | /contacts/{id} | Returns a single contact document |
| DELETE | /contacts/{id} | Deletes a contact document (mark as handled) |

### Project structure

```
contacts-dashboard-api/
  main.py
  firebase.py          # Admin SDK init
  routes/
    contacts.py
  .env                 # FIREBASE_CREDENTIALS_PATH, API_TOKEN
  requirements.txt
```

### Core snippet

```python
# firebase.py
import firebase_admin
from firebase_admin import credentials, firestore
import os

cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
firebase_admin.initialize_app(cred)
db = firestore.client()

# routes/contacts.py
from fastapi import APIRouter, Depends, HTTPException, Header
from firebase import db
import os

router = APIRouter()

def verify_token(authorization: str = Header(...)):
    expected = f"Bearer {os.getenv('API_TOKEN')}"
    if authorization != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.get("/contacts")
def get_contacts(auth=Depends(verify_token)):
    docs = db.collection("contacts").order_by(
        "createdAt", direction=firestore.Query.DESCENDING
    ).stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]
```

---

## Frontend dashboard (optional, phase 2)

A minimal React page (separate from the portfolio) or a standalone HTML file
that calls the FastAPI backend and renders messages as cards.

Not required for phase 1. The FastAPI `/contacts` endpoint alone is enough
to read messages via any HTTP client (curl, Insomnia, browser).

---

## Firestore security rules

The `contacts` collection already has `allow read: if false` on the client-
facing rules. The Admin SDK bypasses these rules entirely, so no rule change
is needed.

---

## Deployment

- API can run locally with `uvicorn main:app --reload`
- For remote access: deploy to Railway, Fly.io, or a simple VPS
- Service account JSON must never be committed to git — use `.env` + `.gitignore`

---

## Steps to implement

1. Generate service account key in Firebase Console
2. Create the FastAPI project with the structure above
3. Add `FIREBASE_CREDENTIALS_PATH` and `API_TOKEN` to `.env`
4. Run locally and test `GET /contacts` with curl or Insomnia
5. (Optional) Build minimal dashboard UI that consumes the API
