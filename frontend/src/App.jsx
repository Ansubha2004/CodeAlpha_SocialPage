import React,{ useState,useEffect } from 'react'
import './App.css'
import Sidebar from "./components/Sidebar.jsx"

function App() {
  

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <Sidebar/>
    </div>
  )
}

export default App
