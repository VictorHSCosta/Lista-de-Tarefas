"use client";

import { useEffect } from "react";

export default function Editar() {
  const id = 0;

  useEffect(() => {
    if (id) {
      console.log(`O ID é: ${id}`);
      // Aqui você pode utilizar o id conforme necessário
    }
  }, [id]);

  return (
    <div>
      <h1>Página de Edição</h1>
      {id ? <p>ID atual: {id}</p> : <p>Carregando...</p>}
    </div>
  );
}
