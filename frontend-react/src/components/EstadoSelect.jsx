export default function EstadoSelect({ estado, onChange }) {
  return (
    <select
      value={estado}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="recibido">Recibido</option>
      <option value="en_diagnostico">En diagnóstico</option>
      <option value="en_reparacion">En reparación</option>
      <option value="listo">Listo</option>
    </select>
  );
}
