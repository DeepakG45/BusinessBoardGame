// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import MonopolyBoard from './Components/monopolyBoard'
import PopupMessage from './Components/popupMessage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PopupMessage />} />
      <Route path="/Lobby" element={<LandingPage />} />
      <Route path="local/Ingame" element={<MonopolyBoard />} />
    </Routes>
  )
}
