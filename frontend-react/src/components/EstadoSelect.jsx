export default function EstadoSelect({ estado }) {
  return (
    <select value={estado} disabled>
      <option value={estado}>{estado}</option>
    </select>
  );
}

