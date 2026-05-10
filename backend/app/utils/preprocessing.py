import re
from typing import List

# Known malicious PowerShell indicators
SUSPICIOUS_KEYWORDS = [
    "iex",
    "invoke-expression",
    "downloadfile",
    "downloadstring",
    "webclient",
    "webrequest",
    "virtualalloc",
    "start-process",
    "encodedcommand",
    "-enc",
    "bypass",
    "hidden",
    "noprofile",
    "noninteractive",
    "frombase64string",
    "tobase64string",
    "memorystream",
    "reflection.assembly",
    "shellcode",
    "createthread",
    "openprocess",
    "writeprocessmemory",
    "amsiutils",
    "set-mppreference",
    "add-mppreference",
    "invoke-mimikatz",
    "invoke-shellcode",
    "net.webclient",
    "system.net",
    "bitsadmin",
    "certutil",
    "regsvr32",
    "rundll32",
    "mshta",
    "wscript",
    "cscript",
    "powershell -",
    "cmd /c",
    "cmd.exe",
]


def normalize_command(command: str) -> str:
    """Normalize a PowerShell command for model input."""
    text = command.lower()
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_indicators(command: str) -> List[str]:
    """Return list of suspicious keywords found in the command."""
    lower = command.lower()
    found = []
    for kw in SUSPICIOUS_KEYWORDS:
        if kw in lower:
            found.append(kw)
    # Deduplicate while preserving order
    seen = set()
    unique = []
    for kw in found:
        if kw not in seen:
            seen.add(kw)
            unique.append(kw)
    return unique


def map_risk_level(confidence: float, prediction: str) -> str:
    """Map confidence + prediction to a human-readable risk level."""
    if prediction == "Benign":
        if confidence >= 90:
            return "Safe"
        return "Low"
    # Malicious
    if confidence >= 85:
        return "Critical"
    if confidence >= 70:
        return "High"
    if confidence >= 50:
        return "Medium"
    return "Low"
