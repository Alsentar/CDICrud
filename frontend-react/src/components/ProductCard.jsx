

export default function ProductCard({ producto }) {
  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h4>{producto.nombre}</h4>
      <p>{producto.precio}</p>
    </div>
  );
}
