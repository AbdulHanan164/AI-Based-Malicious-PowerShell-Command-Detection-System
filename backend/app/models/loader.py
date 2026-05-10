import joblib
import os
from pathlib import Path

# Resolve paths relative to project root (one level above backend/)
BASE_DIR = Path(__file__).resolve().parents[3]  # D:\IS Project

MODEL_PATH = BASE_DIR / "random_forest_model.pkl"
VECTORIZER_PATH = BASE_DIR / "tfidf_vectorizer.pkl"

_model = None
_vectorizer = None


def load_artifacts():
    """Load model and vectorizer from disk. Called once on startup."""
    global _model, _vectorizer

    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found at: {MODEL_PATH}")
    if not VECTORIZER_PATH.exists():
        raise FileNotFoundError(f"Vectorizer not found at: {VECTORIZER_PATH}")

    _model = joblib.load(MODEL_PATH)
    _vectorizer = joblib.load(VECTORIZER_PATH)
    return _model, _vectorizer


def get_model():
    if _model is None:
        raise RuntimeError("Model not loaded. Call load_artifacts() first.")
    return _model


def get_vectorizer():
    if _vectorizer is None:
        raise RuntimeError("Vectorizer not loaded. Call load_artifacts() first.")
    return _vectorizer
