import { useState } from "react";
import "../styles/stylelogin.css";

export default function Login() {
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!numero.trim()) {
      alert("Por favor ingrese un número");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/consultar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero }),
      });

      const data = await response.json();

      if (data.tipo === "empleado") {
        window.location.href = "/crud";
        return;
      }

      if (data.tipo === "orden") {
        window.location.href = `/consulta?entrada=${data.entradaid}`;
        return;
      }

      if (data.error) {
        alert("Número no encontrado");
      }
    } catch (error) {
      console.error("Error al verificar número:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      
      {/* Formulario */}
      <form id="order-number-form" onSubmit={handleSubmit}>
        <label id="formlabel">
          <strong>Número de Orden</strong>
        </label>

        <input
          type="text"
          id="order-number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />

        <input
          id="submitbutton"
          type="submit"
          value={loading ? "Verificando..." : "Verificar"}
          disabled={loading}
        />
      </form>
    </>
  );
}
