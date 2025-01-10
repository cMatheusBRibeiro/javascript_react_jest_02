import { render, screen } from "@testing-library/react";
import { buscaTransacoes } from "./transacoes";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";

describe("Requisições para API", () => {
  it("Deve possuir a mesma quantidade de transações da api apresentadas no extrato", async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });
    const transacoes = await buscaTransacoes();

    const listaTransacoes = await screen.findAllByTestId("extrato-transacao");

    expect(listaTransacoes).toHaveLength(transacoes.length);
    listaTransacoes.forEach((transacao) =>
      expect(transacao).toBeInTheDocument()
    );
  });
});
