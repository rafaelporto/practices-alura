import { useState } from 'react';
import Buscador from './Buscador';
import style from './Cardapio.module.scss';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Filtros from './Filtros';
import Ordenador from './Ordenador';
import Itens from "./Itens";

export default function Cardapio() {
  const [busca, setBusca] = useState('');  
  const [filtro, setFiltro] = useState<number | null>(null);
  const [ordenador, setOrdenador] = useState("");

  return (
    <main>
      <nav className={style.menu}>
      <Logo/>
      </nav>
      <header className={style.header}>
        <div className={style.header__text}>
          A casa do código e da massa
        </div>
      </header>
      <section className={style.cardapio}>
        <h3 className={style.cardaio__titulo}>Cardápio</h3>
        <Buscador
          busca={busca}
          setBusca={setBusca}/>
        <div className={style.cardapio__filtros}>
          <Filtros filtro={filtro} setFiltro={setFiltro}/>
          <Ordenador ordenador={ordenador} setOrdenador={setOrdenador}/>
        </div>
        <Itens busca={busca} filtro={filtro} ordenador={ordenador}/>
      </section>
    </main>
  );
};
