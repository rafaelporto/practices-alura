import React, { ReactNode } from "react";
import style from './Botao.module.scss';

interface Props {
    type?: 'submit' | 'reset' | 'button' | undefined,
    onClick?: () => void,
    children?: ReactNode
}

function Botao({onClick, type, children}: Props) {
    return (
        <button 
            onClick={onClick}
            className={style.botao}
            type={type}>
            {children}
        </button>
    );
}


class Botao1 extends React.Component<{
    type?: 'submit' | 'reset' | 'button' | undefined,
    onClick?: () => void,
    children: ReactNode }> {
    render() {
        const { type = "button", onClick } = this.props;

        return (
            <button onClick={onClick} className={style.botao} type={type}>
                {this.props.children}
            </button>
        );
    }
}

export default Botao;
