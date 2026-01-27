import EquipoRow from "./EquipoRow";

export default function EquipoTable({ equipos, onDelete, onEstadoChange, onDownload}) {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Entrada</th>
          <th>Equipo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Serial</th>
          <th>Estado</th>
          <th>Eliminar Entrada</th>
          <th>Subir Certificado</th>
          <th>Documento de Entrada</th>
        </tr>
      </thead>

      <tbody>
        {equipos.map((equipo) => (
          <EquipoRow 
          key={equipo.entrada} 
          equipo={equipo}
          onDelete={onDelete}
          onEstadoChange={onEstadoChange}
          onDownload={onDownload}
          />
        ))}
      </tbody>
    </table>
  );
}
