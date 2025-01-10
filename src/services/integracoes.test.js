import { render, screen } from "@testing-library/react";
import { buscaTransacoes } from "./transacoes";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";
import api from "./api";

jest.mock("./api");

const mockTransacoes = [
  {
    transacao: "Depósito",
    valor: "750",
    data: "08/01/2025",
    mes: "Janeiro",
    id: 1,
  },
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

describe("Requisições para API", () => {
  it("Deve possuir a mesma quantidade de transações da api apresentadas no extrato", async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacoes));
    render(<AppRoutes />, { wrapper: BrowserRouter });
    const transacoes = await buscaTransacoes();

    const listaTransacoes = await screen.findAllByTestId("extrato-transacao");

    expect(api.get).toHaveBeenCalledWith("/transacoes");
    expect(listaTransacoes).toHaveLength(transacoes.length);
    listaTransacoes.forEach((transacao) =>
      expect(transacao).toBeInTheDocument()
    );
  });
});
