import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/taller">Taller</Link>
    </nav>
  );
}
