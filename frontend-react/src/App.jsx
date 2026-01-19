import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from "react-router-dom";

// Pages (por ahora placeholders)
import Landing from "./pages/Landing";
import Productos from "./pages/Productos";
import TallerLogin from "./pages/TallerLogin";
import TallerCrud from "./pages/TallerCrud";
import Consulta from "./pages/Consulta";

function App() {
  const [count, setCount] = useState(0)

  return (

    



    <>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/taller" element={<TallerLogin />} />
        <Route path="/taller/crud" element={<TallerCrud />} />
        <Route path="/consulta/:entrada" element={<Consulta />} />
      </Routes>


      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
