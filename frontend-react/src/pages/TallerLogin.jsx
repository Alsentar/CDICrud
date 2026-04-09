
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import "../components/TallerLoginStyle.css"

export default function TallerLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Consulte aquí el estado de sus equipos</h1>

      <Login />

      

      <div>
        <button id="Empacc" onClick={() => navigate("/taller/login")}>
          Acceso de empleados
        </button>
      </div>
    </div>
  );
}