import { renderHook } from "@testing-library/react";
import { useEffect, useState } from "react";

it("Hooks", () => {
  const { result } = renderHook(() => {
    const [nome, setNome] = useState("");

    useEffect(() => {
      setNome("Matheus");
    }, []);

    return nome;
  });

  expect(result.current).toBe("Matheus");
});
