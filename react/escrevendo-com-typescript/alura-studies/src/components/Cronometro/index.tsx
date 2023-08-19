import Botao from "../Botao";
import Relogio from "./Relogio";
import style from './Cronometro.module.scss';
import { ITarefa } from "../../types/tarefa";
import { tempoParaSeguntos } from "../../common/utils/date";
import { useEffect, useState } from "react";

interface Props {
    selecionado: ITarefa | undefined;
    finalizarTarefa: () => void;
}

export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
    const [ tempo, setTempo ] = useState<number>();

    useEffect(() => {
        if (selecionado?.tempo) {
            setTempo(tempoParaSeguntos(selecionado?.tempo));        
        }
    }, [selecionado]);

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo}/>
            </div>
            <Botao onClick={() => regressiva(tempo)}>
                Começar!
            </Botao>
        </div>
    );

    function regressiva(contador: number = 0) {
        setTimeout(() => 
        {
            if (contador > 0) {
                const novoContador = contador - 1;
                setTempo(novoContador);
                return regressiva(novoContador);
            }
            finalizarTarefa();
        }, 1000);
    }
};
