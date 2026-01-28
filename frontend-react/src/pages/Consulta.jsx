import { useParams } from "react-router-dom";
import ConsultaBody from "../components/ConsultaBody";


export default function Consulta() {
  const { entrada } = useParams();

  return (
    <>
      <ConsultaBody />
    </>
  );
}
