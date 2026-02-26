
import { useState } from "react";
import "./EquipoDetailsStyle.css";

export default function EquipoDetails({ equipo, onClose, onDiagChange }) {

  const [diagnostico, setDiagnostico] = useState(equipo.diagnostico || "");

  function handleSave() {
    console.log("guardando diagnostico...");
    onDiagChange(equipo.entradaid, diagnostico);
    onClose();
  }

  return (
  <div className="modal-overlay">
    <div className="modal-card">

      <div className="modal-header">
        Detalles del Equipo
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="modal-body">

        <div className="details-grid">
          <p><strong>Entrada</strong>{equipo.entradaid}</p>
          <p><strong>Equipo</strong>{equipo.equipo}</p>
          <p><strong>Marca</strong>{equipo.marca}</p>
          <p><strong>Modelo</strong>{equipo.modelo}</p>
          <p><strong>Serial</strong>{equipo.numeroserial}</p>
          <p><strong>Estado</strong>{equipo.estado}</p>
          <p><strong>Accesorios</strong>{equipo.accesorios}</p>
        </div>

        <h4>Diagnóstico</h4>

        <textarea
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
          rows="5"
          id="areadiag"
        />

      </div>

      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>Cancelar</button>
        <button className="save-btn" onClick={handleSave}>
          Guardar Diagnóstico
        </button>
      </div>

    </div>
  </div>
);
}