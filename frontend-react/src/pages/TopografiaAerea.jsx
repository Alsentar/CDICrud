

import { useState } from "react";
import KmzUploader from "../components/KmzUploader";
import ResultadosCotizacion from "../components/ResultadosCotizacion";
import FormularioContacto from "../components/FormularioContacto";
import "../components/topografiaAerea.css";

export default function TopografiaAerea() {
  const [resultados, setResultados] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="topografia-page">
      <div id="topobodyone">
        <div id="topobodyoverlay"></div>
        <h2>Bienvenido A La Herramienta De Cotizacion De Levantamientos Aereos </h2>
        <p>Suba un archivo KMZ con el polígono a levantar.</p>
      </div>

      <KmzUploader onCalculated={setResultados} />

      {resultados && (
        <ResultadosCotizacion
          resultados={resultados}
          onCotizar={() => setMostrarFormulario(true)}
        />
      )}

      {mostrarFormulario && (
        <FormularioContacto resultados={resultados} />
      )}
    </div>
  );
}
