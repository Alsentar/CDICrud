export default function EstadoSelect({ estado, onChange }) {
  return (
    <select
      value={estado}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="Recibido">Recibido</option>
      <option value="En Diagnostico">En diagnóstico</option>
      <option value="En Reparacion">En reparación</option>
      <option value="Listo">Listo</option>
    </select>
  );
}
