import { useEffect, useState } from "react";
import { getEquipos, createEquipo } from "../services/equiposService";
import EquipoTable from "../components/EquipoTable";
import EquipoForm from "../components/EquipoForm";
import "../components/TallerCrudStyle.css";
import { deleteEquipo } from "../services/equiposService";
import { updateEstadoEquipo } from "../services/equiposService";

export default function TallerCrud() {
  
  
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [formData, setFormData] = useState({
    entrada: "",
    equipo: "",
    marca: "",
    modelo: "",
    serial: "",
    clienteNombre: "",
    clienteEmpresa: "",
    clienteRNC: "",
    clienteTelefono: "",
    clienteEmail: "",
    accesorios: "",
  });

  //setup de info de equipos
  async function fetchEquipos() {
    try {
      setLoading(true);
      const data = await getEquipos();
      setEquipos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEquipos();
  }, []);

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createEquipo(formData);

      
      setFormData({
        entrada: "",
        equipo: "",
        marca: "",
        modelo: "",
        serial: "",
        clienteNombre: "",
        clienteEmpresa: "",
        clienteRNC: "",
        clienteTelefono: "",
        clienteEmail: "",
        accesorios: "",
      });

      
      await fetchEquipos();
    } catch (err) {
      alert("Error al crear equipo");
      console.error(err);
    }
  }

  async function handleEstadoChange(entradaId, nuevoEstado) {
  try {
    await updateEstadoEquipo(entradaId, nuevoEstado);
    await fetchEquipos(); // refresca tabla
   } catch (error) {
    console.error(error);
    alert("Error al actualizar estado");
   }
  
  }

  function handleDownload(entradaId)
  {
    console.log("Dev log: Llamada a la api del doc");
    window.location.href = `/api/equipos/${entradaId}/documento`;
  }

  async function handleDelete(entradaId) {
  const confirmDelete = window.confirm(
    `¿Seguro que deseas eliminar la entrada ${entradaId}?`
  );

  if (!confirmDelete) return;

  try {
    console.log("DELETE frontend Id:", entradaId);
    await deleteEquipo(entradaId);
    await fetchEquipos(); // refresca la tabla
  } catch (error) {
    console.error(error);
    alert("Error al eliminar equipo");
  }
}

  
  
  
  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="taller-container">
      <h1>Taller - Gestión de Equipos</h1>

      <div className="taller-content">

        <EquipoTable 
        equipos={equipos}
        onDelete={handleDelete}
        onEstadoChange={handleEstadoChange}
        onDownload={handleDownload}
        />

        <div className="formstyle">

          <EquipoForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          />

        </div>

      </div>

    </div>
  );
}
