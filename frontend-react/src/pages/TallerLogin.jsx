import { useNavigate } from "react-router-dom";

export default function TallerLogin() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/taller/crud");
  }

  return (
    <div>
      <h1>Taller</h1>
      <button onClick={handleSuccess}>
        Entrar al CRUD
      </button>
    </div>
  );
}
