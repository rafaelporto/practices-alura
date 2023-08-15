import { useState } from "react";
import "./CampoTexto.css";

const CampoTexto = (props) => {

    const placeholderModificada = `${props.placeholder}...`;

    // let valor = 'Guilherme Silveira';

    const aoDigitado = (evento) => {
        props.aoAlterado(evento.target.value);
    }

    return (
        <div className="campo-texto">
            <label>{props.label}</label>
            <input 
                onChange={aoDigitado}
                required={props.obrigatorio} 
                placeholder={placeholderModificada}
                value={props.valor}
            />
        </div>
    );
}

export default CampoTexto;