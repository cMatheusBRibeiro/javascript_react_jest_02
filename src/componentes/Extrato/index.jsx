import React from "react";
import estilos from "./Extrato.module.css";
import Transacoes from "./Transacoes";

export default function Extrato({ transacoes }) {
  return (
    <section className={estilos.container}>
      <h2 className={estilos.titulo}>Extrato</h2>
      <ul data-testid="lista-transacoes">
        {transacoes.map((transacao, indice) => {
          return (
            <Transacoes
              data-testid="item-lista-transacoes"
              key={indice}
              transacao={transacao}
              estilos={estilos}
            />
          );
        })}
      </ul>
    </section>
  );
}
