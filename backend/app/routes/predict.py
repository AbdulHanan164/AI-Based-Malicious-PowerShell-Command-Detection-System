from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
import numpy as np

from app.models.loader import get_model, get_vectorizer
from app.utils.preprocessing import normalize_command, extract_indicators, map_risk_level

router = APIRouter()


class PredictRequest(BaseModel):
    command: str

    @field_validator("command")
    @classmethod
    def command_must_not_be_empty(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("command must not be empty")
        if len(stripped) > 50_000:
            raise ValueError("command exceeds maximum length of 50,000 characters")
        return stripped


class PredictResponse(BaseModel):
    prediction: str
    confidence: float
    risk_level: str
    indicators: list[str]


@router.post("/predict", response_model=PredictResponse)
async def predict(payload: PredictRequest):
    try:
        model = get_model()
        vectorizer = get_vectorizer()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc))

    normalized = normalize_command(payload.command)

    try:
        features = vectorizer.transform([normalized])
        proba = model.predict_proba(features)[0]
        class_index = int(np.argmax(proba))
        confidence = float(round(proba[class_index] * 100, 2))
        label = model.classes_[class_index]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(exc)}")

    # Normalise label to "Malicious" / "Benign"
    prediction = "Malicious" if str(label).lower() in ("malicious", "1", "true", "mal") else "Benign"
    risk_level = map_risk_level(confidence, prediction)
    indicators = extract_indicators(payload.command)

    return PredictResponse(
        prediction=prediction,
        confidence=confidence,
        risk_level=risk_level,
        indicators=indicators,
    )
