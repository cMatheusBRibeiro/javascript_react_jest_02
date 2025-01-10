import { renderHook } from "@testing-library/react";
import useListaTransacoes from "./useListaTransacoes";
import { buscaTransacoes } from "../services/transacoes";
import { act } from "react";

jest.mock("../services/transacoes");

const mockTransacoes = [
  {
    transacao: "Depósito",
    valor: "750",
    data: "08/01/2025",
    mes: "Janeiro",
    id: 1,
  },
];

describe("hooks/useListaTransacoes", () => {
  it("Deve retornar 2 itens no array ao renderizar um hook e trazer as transações mockadas", async () => {
    buscaTransacoes.mockImplementation(() => mockTransacoes);

    const { result } = renderHook(() => useListaTransacoes());

    expect(result.current[0]).toEqual([]);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacoes);
  });
});
