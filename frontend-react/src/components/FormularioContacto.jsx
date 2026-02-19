
import { useState } from "react";

export default function FormularioContacto({ resultados, archivoKmz }) {
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData();

    formData.append("nombre_cliente", form.nombre.value);
    formData.append("empresa", form.empresa.value);
    formData.append("telefono", form.telefono.value);
    formData.append("correo", form.correo.value);
    formData.append("area_lev", resultados.area);
    formData.append("dist_off", resultados.distance);
    formData.append("costo_final", resultados.precio);

    if (archivoKmz) {
      formData.append("kmz", archivoKmz);
    }

    

    const res = await fetch("/api/cotizar/register", {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: formData,
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
