import os
from fastapi import APIRouter, Depends, HTTPException, Header
from google.cloud.firestore_v1 import Query
from firebase import db

router = APIRouter()


def verify_token(authorization: str = Header(...)):
    expected = f"Bearer {os.getenv('API_TOKEN')}"
    if authorization != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


def _serialize(doc):
    data = doc.to_dict()
    # Convert Firestore Timestamp to ISO string
    if "createdAt" in data and data["createdAt"] is not None:
        data["createdAt"] = data["createdAt"].isoformat()
    return {"id": doc.id, **data}


@router.get("/contacts")
def get_contacts(auth=Depends(verify_token)):
    docs = (
        db.collection("contacts")
        .order_by("createdAt", direction=Query.DESCENDING)
        .stream()
    )
    return [_serialize(doc) for doc in docs]


@router.get("/contacts/{contact_id}")
def get_contact(contact_id: str, auth=Depends(verify_token)):
    doc = db.collection("contacts").document(contact_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Contact not found")
    return _serialize(doc)


@router.delete("/contacts/{contact_id}")
def delete_contact(contact_id: str, auth=Depends(verify_token)):
    ref = db.collection("contacts").document(contact_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Contact not found")
    ref.delete()
    return {"deleted": contact_id}
