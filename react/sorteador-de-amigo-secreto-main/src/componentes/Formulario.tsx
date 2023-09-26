import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hooks/useMensagemDeErro";

const Formulario = () => {

  const [nome, setNome] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome("");
    inputRef.current?.focus();

  }

  return (<form onSubmit={evento => adicionarParticipante(evento)}>
    <input 
      ref={inputRef}
      value={nome}
      onChange={(evento) => setNome(evento.target.value)}
      type="text"
      placeholder="Insira os nomes dos participantes" />
    <button type="submit" disabled={!nome}>Adicionar</button>
    {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
  </form>);
}

export default Formulario;
