import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useSorteador } from "../state/hooks/useSorteador";

const Rodape = () => {
  
  const participantes = useListaDeParticipantes();

  const navegarPara = useNavigate();

  const sortear = useSorteador();

  const iniciar = () => {
    sortear();
    navegarPara("/sorteios");
   };

  return (<footer>
    <button disabled={participantes.length < 3} onClick={iniciar}>Iniciar brincadeira</button>
  </footer>);
}

export default Rodape;
