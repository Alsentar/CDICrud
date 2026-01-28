

export default function AccessoriesHeader({ onChange }) {
  return (
    <div className="accessories-header">
      <button onClick={() => onChange("tripodes")}>Trípodes</button>
      <button onClick={() => onChange("prismas")}>Prismas</button>
      <button onClick={() => onChange("jalon")}>Jalón</button>
    </div>
  );
}
