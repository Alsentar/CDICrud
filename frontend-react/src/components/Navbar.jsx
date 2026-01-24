import { Link } from "react-router-dom";

import "./Navbarstyle.css";
import logo from "../assets/logo.png"; 

export default function Navbar() {
  return (
    <header className="header">
      
      <img
        id="companylogo"
        src={logo}
        alt="Casa del Ingeniero"
      />

      
      <nav id="header-links">
        <Link to="/cotizaciones">Cotizaciones</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/#contacto">Contacto</Link>
        <Link to="/">Inicio</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/taller">Taller</Link>
      </nav>
    </header>
  );
}