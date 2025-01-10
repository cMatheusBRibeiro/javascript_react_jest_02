import { renderHook } from "@testing-library/react";
import useSaldo from "./useSaldo";
import { buscaSaldo } from "../services/saldo";
import { act } from "react";

jest.mock("../services/saldo");

const mockSaldo = {
  valor: 2500,
};

describe("hooks/useSaldo", () => {
  it("Deve retornar o saldo e a função de atualizar o saldo, o saldo tendo o valor do mock", async () => {
    buscaSaldo.mockImplementation(() => mockSaldo.valor);
    const { result } = renderHook(() => useSaldo());

    expect(result.current[0]).toEqual(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(2500);
  });
});
