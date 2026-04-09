import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/EmployeeLoginStyle.css";

export default function EmployeeLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error || "No se pudo iniciar sesión");
        return;
      }

      navigate("/taller/crud");
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="employee-login-page">
      <div className="employee-login-card">
        <h1>Login de Empleados</h1>
        <p>Ingrese sus credenciales para acceder al panel de taller.</p>

        <form onSubmit={handleSubmit} className="employee-login-form">
          <label>
            Usuario
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}