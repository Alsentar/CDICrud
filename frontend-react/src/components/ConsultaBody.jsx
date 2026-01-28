import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ConsultBodyStyle.css";
import { useNavigate } from "react-router-dom";


export default function ConsultaBody() {
  const { entrada } = useParams();

  const [equipo, setEquipo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nuevaEntrada, setNuevaEntrada] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function cargarEquipo() {
      if (!entrada) return;

      try {
        const response = await fetch(`/api/equipos/${entrada}`);

        if (!response.ok) {
          throw new Error("Equipo no encontrado");
        }

        const data = await response.json();
        setEquipo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarEquipo();
  }, [entrada]);

  function handleNuevaConsulta(e) {
  e.preventDefault();

  if (!nuevaEntrada.trim()) {
    alert("Ingrese un número de entrada");
    return;
  }

  navigate(`/consulta/${nuevaEntrada}`);
  setNuevaEntrada("");
  }


  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!equipo) return null;

  return (
    <div id="restofbody">
      <div id="EntradaEquipoMarca">
        <div className="container">
          <h4>No. De Entrada</h4>
          <h4 id="entradanumero">{equipo.entradaid}</h4>
        </div>

        <div className="container">
          <h4>Equipo</h4>
          <h4 id="nombreEquipo">{equipo.equipo}</h4>
        </div>

        <div className="container">
          <h4>Marca</h4>
          <h4 id="nombreMarca">{equipo.marca}</h4>
        </div>
      </div>

      <div id="ModeloSerial">
        <div className="container">
          <h4>Modelo</h4>
          <h4 id="nombreModelo">{equipo.modelo}</h4>
        </div>

        <div className="container">
          <h4>Serial</h4>
          <h4 id="codigoSerial">{equipo.numeroserial}</h4>
        </div>
      </div>

      <div id="BlankEstadoConsultar">
        <div className="container"></div>

        <div className="container">
          <h4>Estado</h4>
          <h4 id="estadoEquipo">{equipo.estado}</h4>
        </div>

        <div className="containerform">
          <form id="ordernumberinform" onSubmit={handleNuevaConsulta}>
                <label id="consultlabel">
                <strong>Consultar otra entrada</strong>
                </label>

                <input
                type="text"
                id="consultinput"
                value={nuevaEntrada}
                onChange={(e) => setNuevaEntrada(e.target.value)}
                />

                <input id="submitbutt" type="submit" value="Verificar" />
            </form>
        </div>


        <button
          id="cert-download-btn"
          onClick={() =>
            window.location.href = `/api/equipos/${equipo.entradaid}/certificado`
          }
        >
          Descargar Certificado de Calibración
        </button>
      </div>
    </div>
  );
}
