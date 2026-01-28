import { useState } from "react";
import ProductsHeader from "../components/ProductsHeader";
import AccessoriesHeader from "../components/AccessoriesHeader";
import ProductList from "../components/ProductList";
import { productos } from "../data/productos";
import "../components/Productos.css";

export default function Productos() {
  const [categoria, setCategoria] = useState("niveles");
  const [subcategoria, setSubcategoria] = useState("tripodes");

  let data = [];

  if (categoria === "accesorios") {
    data = productos.accesorios[subcategoria];
  } else {
    data = productos[categoria];
  }

  return (
    <>
      
      <div className="productos-page">
         <ProductsHeader onChange={setCategoria} />

         {categoria === "accesorios" && (
         <AccessoriesHeader onChange={setSubcategoria} />
         )}

         <ProductList productos={data} grid={categoria === "accesorios"} />
      </div>

      
      
    </>
  );
}
