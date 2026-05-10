import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import IntroductionPage from './pages/IntroductionPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<LandingPage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/dashboard"    element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
