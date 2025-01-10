import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./paginas/Principal/App";
import Cartoes from "./componentes/Cartoes";

describe("Rotas", () => {
  it("Deve renderizar a página principal e encontrar o nome do usuário", () => {
    render(<App />, { wrapper: BrowserRouter });
    const usuario = screen.getByText("Olá, Joana :)!");
    expect(usuario).toBeInTheDocument();
  });

  it("Deve renderizar rotas da aplicação e validar se os cartões estão sendo exibidos", () => {
    const rota = "/cartoes";

    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText("Meus cartões");

    expect(meusCartoes).toBeInTheDocument();
  });
});
