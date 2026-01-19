import { useParams } from "react-router-dom";

export default function Consulta() {
  const { entrada } = useParams();

  return (
    <>
      <h1>Consulta</h1>
      <p>Entrada: {entrada}</p>
    </>
  );
}
