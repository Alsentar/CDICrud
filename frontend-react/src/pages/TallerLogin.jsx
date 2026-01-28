import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

export default function TallerLogin() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/taller/crud");
  }

  return (
    <div>
      <h1>Consulte aqui sus equipos</h1>
      <Login />
    </div>
  );
}
