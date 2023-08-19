import style from './Lista.module.scss';
import Item from './Item';
import { ITarefa } from '../../types/tarefa';

interface Props {
    tarefas: Array<ITarefa>;
    selecionaTarefa: (tarefa: ITarefa) => void;
}

function Lista({ tarefas, selecionaTarefa }: Props) {

    return (
        <aside className={style.listaTarefas}>
            <h2>Estudos do dia</h2>
            <ul>
                {tarefas.map(item => 
                    <Item 
                        selecionaTarefa={selecionaTarefa}
                        key={item.id}
                        {...item}
                    ></Item>
                )}
            </ul>
        </aside>
    );
}

export default Lista;
