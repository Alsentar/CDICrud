

import ProductCard from "./ProductCard";

export default function ProductList({ productos, grid }) {
  return (
    <div className={grid ? "products-grid" : "products-list"}>
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
