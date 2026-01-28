
export default function ProductsHeader({ onChange }) {
  return (
    <div className="products-header">
      <button onClick={() => onChange("niveles")}>Niveles</button>
      <button onClick={() => onChange("estaciones")}>Estaciones</button>
      <button onClick={() => onChange("accesorios")}>Accesorios</button>
    </div>
  );
}
