
export default function ResultadosCotizacion({ resultados, onCotizar }) {
  return (
    <div className="card results-card">
      <h2>Resultados:</h2>

      



      <div className="result-row">
  
  <p>
    <strong>Área a levantar (m²):</strong>{" "}
    {resultados.area.toLocaleString()}
  </p>
</div>

<div className="result-row">
  
  <p>
    <strong>Distancia desde Santo Domingo (km):</strong>{" "}
    {resultados.distance}
  </p>
</div>

<div className="result-row">
  
  <p>
    <strong>Precio Aproximado (DOP):</strong>{" RD$"}
    {resultados.precio.toLocaleString()}
  </p>
</div>

      
      

      <button onClick={onCotizar}>Cotizar levantamiento</button>
    </div>
  );
}
