import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <main className="overflow-x-hidden bg-white text-primary">
      <Navbar />
    </main>
  )
}

export default App
