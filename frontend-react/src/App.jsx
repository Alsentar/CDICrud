import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Productos from "./pages/Productos";
import TallerLogin from "./pages/TallerLogin";
import TallerCrud from "./pages/TallerCrud";
import Consulta from "./pages/Consulta";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/taller" element={<TallerLogin />} />
        <Route path="/taller/crud" element={<TallerCrud />} />
        <Route path="/consulta/:entrada" element={<Consulta />} />
      </Routes>
    </>
  );
}

export default App;
