

export async function getEquipos() {
  const response = await fetch("/api/equipos");

  if (!response.ok) {
    throw new Error("Error al obtener equipos");
  }

  return response.json();
}

export async function createEquipo(formData) {
  const payload = {
    //equipo
    entrada: formData.entrada,
    equipo: formData.equipo,
    marca: formData.marca,
    modelo: formData.modelo,
    serial: formData.serial,
    accesorios: formData.accesorios,
    estado: "recibido", 

    // cliente
    nombre: formData.clienteNombre,
    empresa: formData.clienteEmpresa,
    rnc: formData.clienteRNC,
    phone: formData.clienteTelefono,
    mail: formData.clienteEmail,
  };

  const response = await fetch("/api/equipos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error al crear equipo");
  }

  return response.json();
}

//error here
export async function deleteEquipo(entradaId) {
  const response = await fetch(`/api/equipos/${entradaId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar equipo");
  }

  return response.json();
}

export async function updateEstadoEquipo(entradaId, nuevoEstado) {
  const response = await fetch(`/api/equipos/${entradaId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar estado");
  }

  return response.json();
}


