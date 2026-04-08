
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

export default function TallerLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Área de Taller</h1>
      <p>Consulte aquí el estado de sus equipos o acceda como empleado.</p>

      <Login />

      <hr style={{ margin: "30px 0" }} />

      <div>
        <h2>Acceso de empleados</h2>
        <button onClick={() => navigate("/taller/login")}>
          Ir al login de empleados
        </button>
      </div>
    </div>
  );
}