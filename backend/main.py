from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.models.loader import load_artifacts
from app.routes.predict import router as predict_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load ML artifacts once at startup
    load_artifacts()
    print("✅ Model and vectorizer loaded successfully.")
    yield
    print("🛑 Shutting down.")


app = FastAPI(
    title="AI PowerShell Threat Detection API",
    description="Detects malicious PowerShell commands using a Random Forest classifier.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api/v1", tags=["Detection"])


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok", "service": "PowerShell Threat Detection API"}
