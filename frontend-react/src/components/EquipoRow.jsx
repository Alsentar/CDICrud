import EstadoSelect from "./EstadoSelect";

export default function EquipoRow({ equipo, onDelete, onEstadoChange, onDownload, onVerify}) {
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
        <button className="upload-btn">Subir Cert.</button>
      </td>
      <td>
        <button className="download-btn" onClick={() => onDownload(equipo.entradaid)}>Descargar Entrada</button>
      </td>
    </tr>
  );
}


