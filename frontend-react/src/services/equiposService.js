

export async function getEquipos() {
  const response = await fetch("/api/equipos");

  if (!response.ok) {
    throw new Error("Error al obtener equipos");
  }

  return response.json();
}
