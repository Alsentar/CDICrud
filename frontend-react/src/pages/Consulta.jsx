import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Consulta() {
  const { entrada } = useParams();

  return (
    <>
      <h1>Space</h1>
      <h1>Consulta</h1>
      <p>Entrada: {entrada}</p>
    </>
  );
}
