from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.contacts import router as contacts_router

app = FastAPI(title="Contacts Dashboard API", docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "DELETE"],
    allow_headers=["Authorization"],
)

app.include_router(contacts_router)


@app.get("/")
def root():
    return {"status": "ok"}
