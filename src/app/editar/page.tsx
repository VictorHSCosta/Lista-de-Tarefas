// src/app/editar/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Tarefa {
  id: number;
  nome: string;
  dataLimite: string;
  custo: number;
  ordem: number;
}

export default function EditTarefaPage() {
  const router = useRouter();
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const [nome, setNome] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [custo, setCusto] = useState(0);

  useEffect(() => {
    const tarefaId = window.location.pathname.split("/").pop();
    if (tarefaId) {
      fetchTarefa(tarefaId);
    }
  }, []);

  async function fetchTarefa(tarefaId: string) {
    try {
      const response = await fetch(`/api/tarefas?id=${tarefaId}`);
      if (response.ok) {
        const data = await response.json();
        setTarefa(data);
        setNome(data.name);
        setDataLimite(data.data);
        setCusto(data.preco);
      } else {
        console.error("Erro ao buscar tarefa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error);
    }
  }

  const handleSave = async () => {
    if (!tarefa) return;

    try {
      const response = await fetch(`/api/tarefas?id=${tarefa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tarefa.id,
          name: nome,
          data: dataLimite,
          preco: custo,
          ordem: tarefa.ordem,
        }),
      });

      if (response.ok) {
        alert("Tarefa atualizada com sucesso!");
        router.push("/"); // Redireciona de volta para a página principal após salvar
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao atualizar tarefa");
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Erro ao atualizar tarefa");
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl">Editar Tarefa</h1>
      {tarefa ? (
        <div className="flex flex-col gap-4">
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="block w-full rounded-md border p-2"
            />
          </label>
          <label>
            Data Limite:
            <input
              type="date"
              value={dataLimite}
              onChange={(e) => setDataLimite(e.target.value)}
              className="block w-full rounded-md border p-2"
            />
          </label>
          <label>
            Custo:
            <input
              type="number"
              value={custo}
              onChange={(e) => setCusto(parseFloat(e.target.value))}
              className="block w-full rounded-md border p-2"
            />
          </label>
          <button
            onClick={handleSave}
            className="mt-4 rounded-md bg-blue-500 p-2 text-white"
          >
            Salvar
          </button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
