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
import Nosotros from "./pages/Nosotros";
import TopografiaAerea from "./pages/TopografiaAerea";
import EmployeeLogin from "./pages/EmployeeLogin";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/taller" element={<TallerLogin />} />
        <Route path="/taller/login" element={<EmployeeLogin />} />
        <Route
          path="/taller/crud"
          element={
            <ProtectedRoute>
              <TallerCrud />
            </ProtectedRoute>
          }
        />
        <Route path="/consulta/:entrada" element={<Consulta />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/topografiaAerea" element={<TopografiaAerea />} />
      </Routes>
    </>
  );
}

export default App;
