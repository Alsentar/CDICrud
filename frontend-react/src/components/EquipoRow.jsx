import EstadoSelect from "./EstadoSelect";

export default function EquipoRow({ equipo }) {
  return (
    <tr>
      <td>{equipo.entradaid}</td>
      <td>{equipo.equipo}</td>
      <td>{equipo.marca}</td>
      <td>{equipo.modelo}</td>
      <td>{equipo.numeroserial}</td>
      <td>
        <EstadoSelect estado={equipo.estado} />
      </td>
    </tr>
  );
}


