import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./routes";

describe("Rotas", () => {
  it("Deve renderizar a página principal e encontrar o nome do usuário", () => {
    const rota = "/";
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const usuario = screen.getByText("Olá, Joana :)!");
    expect(usuario).toBeInTheDocument();
  });

  it("Deve renderizar rotas da aplicação e validar se os cartões estão sendo exibidos", () => {
    const rota = "/cartoes";
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText("Meus cartões");
    expect(meusCartoes).toBeInTheDocument();
  });

  it("Deve renderizar o useLocation para /cartoes", () => {
    const rota = "/cartoes";
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const textoDaRota = screen.getByTestId("local");
    expect(textoDaRota).toHaveTextContent(rota);
  });

  it("Deve renderizar a página 404", () => {
    const rotaInexistente = "/rota-inexistente";
    render(
      <MemoryRouter initialEntries={[rotaInexistente]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const paginaErro = screen.getByTestId("pagina-404");
    expect(paginaErro).toBeInTheDocument();
  });
});
