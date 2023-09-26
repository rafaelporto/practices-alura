import React from "react";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";

const Sorteio = () => {
  
  const participantes = useListaDeParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = React.useState("");
  const [ amigoSecreto, setAmigoSecreto ] = React.useState("");

  const resultado = useResultadoSorteio();
  
  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);
    }
  };

  return (<section>
    <form onSubmit={sortear}>
      <select 
        required 
        name="participanteDavez" 
        id="participanteDavez" 
        placeholder="Selecione o seu nome"
        value={participanteDaVez}
        onChange={evento => setParticipanteDaVez(evento.target.value)}>
        <option value="">Selecione o seu nome</option>
        {participantes.map((participante) => 
        <option key={participante}>{participante}</option>)}
      </select>
      <button type="submit">Sortear</button>
    </form>
    {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
  </section>);
}

export default Sorteio;
