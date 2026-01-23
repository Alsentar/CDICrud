import EquipoRow from "./EquipoRow";

export default function EquipoTable({ equipos }) {
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
        </tr>
      </thead>

      <tbody>
        {equipos.map((equipo) => (
          <EquipoRow key={equipo.id} equipo={equipo} />
        ))}
      </tbody>
    </table>
  );
}
