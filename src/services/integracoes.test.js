import { render, screen } from "@testing-library/react";
import { buscaTransacoes, salvaTransacao } from "./transacoes";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";
import api from "./api";
import { buscaSaldo } from "./saldo";

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

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequisicaoPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockRequisicaoPostErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe("Requisições para API Transação", () => {
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

  it("Deve ser retornado uma lista vazia na busca de transações", async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    render(<AppRoutes />, { wrapper: BrowserRouter });
    const transacoes = await buscaTransacoes();

    const listaTransacoes = screen.queryAllByTestId("extrato-transacao");

    expect(transacoes).toEqual([]);
    expect(listaTransacoes).toHaveLength(transacoes.length);
  });

  it("Deve adicionar uma nova transação e retornar 201 (Created)", async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());

    const statusTransacao = await salvaTransacao(mockTransacoes[0]);

    expect(statusTransacao).toEqual(201);
    expect(api.post).toHaveBeenCalledWith("/transacoes", mockTransacoes[0]);
    expect(api.post).toHaveBeenCalledTimes(1);
  });

  it("Deve tentar adicionar uma nova transação e falhar", async () => {
    api.post.mockImplementation(() => mockRequisicaoPostErro());

    const mensagemDeErro = await salvaTransacao(mockTransacoes[0]);

    expect(mensagemDeErro).toEqual("Erro na requisição");
    expect(api.post).toHaveBeenCalledWith("/transacoes", mockTransacoes[0]);
    expect(api.post).toHaveBeenCalledTimes(1);
  });
});

const mockSaldo = {
  valor: 2500,
};

describe("Requisições para API Saldo", () => {
  it("Deve buscar o saldo da API", async () => {
    api.get.mockImplementation(() => mockRequisicao(mockSaldo));
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith("/saldo");
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it("Deve falhar ao buscar o saldo da API e retornar o valor de 1000", async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith("/saldo");
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
