import App from "./App";
import AppRoutes from "../../routes";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Componente <App />", () => {
  it("Deve permitir adicionar uma transação em extrato", () => {
    render(<App />, { wrapper: BrowserRouter });

    const selectTransacao = screen.getByTestId("select-opcoes");
    const inputValor = screen.getByTestId("input-valor");
    const botao = screen.getByTestId("submit-formulario-transacao");

    userEvent.selectOptions(selectTransacao, "Depósito");
    userEvent.type(inputValor, "100");
    userEvent.click(botao);

    const listaTransacao = screen.getByTestId("lista-transacoes");
    const itens = screen.getByRole("listitem");

    expect(listaTransacao).toContainElement(itens);
  });

  it("Deve encontrar o link para página de meus cartões", () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText("Cartões");
    expect(linkPaginaCartoes).toBeInTheDocument();
  });

  it("Deve clicar no link para página de meus cartões e ser redirecionado", async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText("Cartões");
    userEvent.click(linkPaginaCartoes);

    const tituloDaPagina = await screen.findByText("Meus cartões");
    expect(tituloDaPagina).toBeInTheDocument();
  });

  describe("Página de investimentos", () => {
    it("Deve encontrar o link para a página de investimentos", () => {
      render(<AppRoutes />, { wrapper: BrowserRouter });

      const linkPaginaInvestimentos = screen.getByText("Investimentos");

      expect(linkPaginaInvestimentos).toBeInTheDocument();
    });

    it("Deve clicar no link para a página de investimentos e ser redirecionado", async () => {
      render(<AppRoutes />, { wrapper: BrowserRouter });
      const linkPaginaInvestimentos = screen.getByText("Investimentos");
      userEvent.click(linkPaginaInvestimentos);

      const tituloDaPagina = await screen.findByTestId("titulo-investimentos");

      expect(tituloDaPagina).toHaveTextContent("Investimentos");
    });
  });
});
