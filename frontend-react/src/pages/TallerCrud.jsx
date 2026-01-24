
import { useEffect, useState } from "react";
import { getEquipos } from "../services/equiposService";
import EquipoTable from "../components/EquipoTable";
import Navbar from "../components/Navbar";

export default function TallerCrud() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEquipos() {
      try {
        const data = await getEquipos();
        setEquipos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipos();
  }, []);

  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      
      <h1>Taller - Gestión de Equipos</h1>
      <EquipoTable equipos={equipos} />
    </div>
  );
}
