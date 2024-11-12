"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IncluirPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [custo, setCusto] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  interface Tarefa {
    name: string;
    preco: string;
    data: string;
    order: number;
  }

  const getNextOrder = async (): Promise<number> => {
    try {
      const response = await fetch("/api/tarefas");
      if (!response.ok) {
        throw new Error("Erro ao buscar tarefas");
      }
      const tarefas: Tarefa[] = await response.json();

      if (tarefas.length === 0) return 1;

      const maxOrder = Math.max(...tarefas.map((tarefa) => tarefa.order));
      return maxOrder + 1;
    } catch (error) {
      console.error("Erro ao buscar ordem:", error);
      return 1;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const nextOrder = await getNextOrder();

      const response = await fetch("/api/tarefas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          preco: custo,
          data: dataLimite,
          order: nextOrder, // Usa a ordem calculada
        } as Tarefa),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar tarefa");
      }

      if (isClient) {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col justify-center bg-backgroundColor p-6 align-middle md:p-32">
      <h1 className="my-4 py-11 text-4xl text-primaryColor">Incluir</h1>
      <form onSubmit={handleSubmit} className="flex flex-col text-xl">
        <label htmlFor="nome" className="py-4">
          Nome:
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2"
          required
        />
        <label htmlFor="dataLimite" className="py-4">
          Data limite:
        </label>
        <input
          type="date"
          id="dataLimite"
          name="dataLimite"
          value={dataLimite}
          onChange={(e) => setDataLimite(e.target.value)}
          className="border p-2"
          required
        />
        <label htmlFor="custo" className="py-4">
          Custo:
        </label>
        <input
          type="number"
          id="custo"
          name="custo"
          value={custo}
          onChange={(e) => setCusto(e.target.value)}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="m-16 bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Incluir
        </button>
      </form>
    </div>
  );
}
