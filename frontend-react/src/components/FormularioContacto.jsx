
import { useState } from "react";

export default function FormularioContacto({ resultados }) {
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const payload = {
      nombre_cliente: form.nombre.value,
      empresa: form.empresa.value,
      telefono: form.telefono.value,
      correo: form.correo.value,
      area_lev: resultados.area,
      dist_off: resultados.distance,
      costo_final: resultados.precio,
    };

    const res = await fetch("/api/cotizar/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) setEnviado(true);
  }

  if (enviado) {
    return <p>¡Solicitud enviada correctamente!</p>;
  }

  return (
    <form id="pricingform" className="card" onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input name="nombre" required />

      <label>Empresa</label>
      <input name="empresa" />

      <label>Teléfono</label>
      <input name="telefono" required />

      <label>Correo</label>
      <input name="correo" type="email" required />

      <button type="submit">Enviar Cotización</button>
    </form>
  );
}
