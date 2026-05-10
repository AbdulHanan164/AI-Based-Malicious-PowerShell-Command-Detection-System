import axios from 'axios'

// In production set VITE_API_URL to your deployed backend URL in Vercel env vars.
// Locally it falls back to localhost.
const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000') + '/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

/**
 * Analyse a PowerShell command.
 * @param {string} command
 * @returns {Promise<{prediction: string, confidence: number, risk_level: string, indicators: string[]}>}
 */
export async function analyzeCommand(command) {
  const { data } = await apiClient.post('/predict', { command })
  return data
}

export default apiClient
