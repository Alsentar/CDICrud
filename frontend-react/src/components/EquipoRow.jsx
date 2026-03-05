import { useRef } from "react";
import EstadoSelect from "./EstadoSelect";

export default function EquipoRow({ equipo, onDelete, onEstadoChange, onDownload, onVerify, onUploadCertificado}) {
  
  const fileInputRef = useRef(null);

  function handleFileChange(e){
    const file = e.target.files[0];
    onUploadCertificado(equipo.entradaid, file);
    e.target.value = ""; 
  }
  
  
  
  return (
    <tr>
      <td>{equipo.entradaid}</td>
      <td>{equipo.equipo}</td>
      <td>{equipo.marca}</td>
      <td>{equipo.modelo}</td>
      <td>{equipo.numeroserial}</td>
      <td>
        <EstadoSelect
          estado={equipo.estado}
          onChange={(nuevoEstado) =>
            onEstadoChange(equipo.entradaid, nuevoEstado)
          }
        />
      </td>
      <td>
        <button className="verify-btn" onClick={() => onVerify(equipo.entradaid)}>Verificar</button>
      </td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(equipo.entradaid)}>Eliminar</button>
      </td>
      <td>
        <button className="upload-btn" onClick={() => fileInputRef.current.click()}>Subir Cert.</button>
        <input type="file" accept=".pdf,.docx,.doc" ref={fileInputRef} style={{ display: "none"}} onChange={handleFileChange} />
      </td>
      <td>
        <button className="download-btn" onClick={() => onDownload(equipo.entradaid)}>Descargar Entrada</button>
      </td>
    </tr>
  );
}


