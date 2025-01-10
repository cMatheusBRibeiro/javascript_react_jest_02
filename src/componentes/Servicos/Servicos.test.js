import { render, screen } from "@testing-library/react";
import Servicos from "./index";

describe("Serviços", () => {
  it("Deve renderizar na página", () => {
    render(<Servicos />);

    const servicos = screen.getByTestId("servicos");

    expect(servicos).toBeInTheDocument();
  });
});
