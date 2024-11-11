"use client";

import router from "next/router";
import { useEffect, useState } from "react";
import Modal from "~/app/_components/modal";

export function BlocosFrontEnd() {
  interface Tarefa {
    id: number;
    nome: string;
    dataLimite: string;
    custo: number;
    ordem: number;
  }

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);

  async function fetchTarefas() {
    try {
      const response = await fetch("/api/tarefas");
      if (response.ok) {
        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        const tarefasFormatadas = data
          .map((item: any) => ({
            id: item.id,
            nome: item.name,
            dataLimite: item.data,
            custo: item.preco,
            ordem: item.order,
          }))
          .sort((a: Tarefa, b: Tarefa) => a.ordem - b.ordem);

        setTarefas(tarefasFormatadas);
      } else {
        console.error("Erro ao buscar tarefas:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  async function getOrdersById(id: number, direction: number) {
    try {
      const response = await fetch("/api/getOrder");
      if (response.ok) {
        const data = await response.json();

        // Encontrar o item atual
        const itemAtual = data.find(
          (item: {
            id: number;
            name: string;
            preco: number;
            data: string;
            ordem: number;
          }) => item.id === id,
        );

        if (direction === 0) {
          // Mover para cima
          const itemAnterior = data
            .filter(
              (item: {
                id: number;
                name: string;
                preco: number;
                data: string;
                ordem: number;
              }) => item.ordem < itemAtual.ordem,
            )
            .sort(
              (a: { ordem: number }, b: { ordem: number }) => b.ordem - a.ordem,
            )[0];

          console.log("Item anterior:", itemAnterior);

          if (itemAnterior) {
            // Atualizar o item atual usando PUT
            await fetch(`/api/tarefas/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: itemAtual.id,
                name: itemAtual.name,
                preco: itemAtual.preco,
                data: itemAtual.data,
                order: itemAnterior.ordem,
              }),
            });

            // Atualizar o item anterior usando PUT

            await fetch(`/api/tarefas/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: itemAnterior.id,
                name: itemAnterior.name,
                preco: itemAnterior.preco,
                data: itemAnterior.data,
                order: itemAtual.ordem,
              }),
            });

            console.log(
              `Trocou ordem ${itemAtual.ordem} com ordem ${itemAnterior.ordem}`,
            );

            fetchTarefas();
          } else {
            console.log("Já está no topo, não é possível mover para cima");
          }
        } else if (direction === 1) {
          // Mover para baixo
          const itemProximo = data
            .filter(
              (item: {
                id: number;
                name: string;
                preco: number;
                data: string;
                ordem: number;
              }) => item.ordem > itemAtual.ordem,
            )
            .sort(
              (a: { ordem: number }, b: { ordem: number }) => a.ordem - b.ordem,
            )[0];

          console.log("Item próximo:", itemProximo);

          if (itemProximo) {
            const ordemTemp = itemAtual.ordem;

            // Atualizar o item atual usando PUT
            await fetch(`/api/tarefas/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: itemAtual.id,
                name: itemAtual.name,
                preco: itemAtual.preco,
                data: itemAtual.data,
                order: itemProximo.ordem,
              }),
            });

            // Atualizar o item próximo usando PUT
            await fetch(`/api/tarefas/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: itemProximo.id,
                name: itemProximo.name,
                preco: itemProximo.preco,
                data: itemProximo.data,
                order: itemAtual.ordem,
              }),
            });

            console.log(
              `Trocou ordem ${itemAtual.ordem} com ordem ${itemProximo.ordem}`,
            );

            fetchTarefas();
          } else {
            console.log("Já está no final, não é possível mover para baixo");
          }
        }

        return {
          success: true,
          message: "Operação realizada com sucesso",
        };
      } else {
        console.error("Erro ao buscar orders:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na função getOrdersById:", error);
      return {
        success: false,
        message: "Erro ao realizar a operação",
      };
    }
  }

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleDelete = async (id: number) => {
    // Confirmação antes de deletar
    if (!confirm("Tem certeza que deseja deletar esta tarefa?")) {
      return;
    }

    try {
      const response = await fetch(`/api/tarefas?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTarefas();
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao deletar tarefa");
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert("Erro ao deletar tarefa");
    }
  };

  const handleRedirecionar = (tarefa: Tarefa) => {
    setTarefaAtual(tarefa);
    setIsModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTarefaAtual((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async () => {
    if (tarefaAtual) {
      try {
        const response = await fetch(`/api/tarefas/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: tarefaAtual.id,
            name: tarefaAtual.nome,
            preco: tarefaAtual.custo,
            data: tarefaAtual.dataLimite,
            order: tarefaAtual.ordem,
          }),
        });

        if (response.ok) {
          fetchTarefas();
          setIsModalOpen(false);
        } else {
          console.error("Erro ao atualizar tarefa");
          alert("O Nome das tarefas nao podem ser iguais");
        }
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    }
  };

  return (
    <div>
      <ul className="">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`m-4 flex justify-between border p-4 ${
              tarefa.custo >= 1000 ? "bg-moneyExcess" : "bg-transparent"
            }`}
          >
            <div className="my-4 text-xl">
              <h2 className="mb-4 text-2xl text-primaryColor">{tarefa.nome}</h2>
              <p>
                Data limite: {new Date(tarefa.dataLimite).toLocaleDateString()}
              </p>
              <p>Custo: {tarefa.custo}</p>
            </div>
            <div className="grid gap-2">
              <button
                onClick={() => getOrdersById(tarefa.id, 0)}
                className="rounded-md bg-yellow-400 p-1 text-white"
              >
                UP
              </button>
              <button
                className="rounded-md bg-yellow-600 p-1 text-white"
                onClick={() => getOrdersById(tarefa.id, 1)}
              >
                DOWN
              </button>
              <button
                className="rounded-md bg-green-500 p-1 text-white"
                onClick={() => handleRedirecionar(tarefa)}
              >
                Editar
              </button>
              <button
                className="rounded-md bg-red-600 p-1 text-white"
                onClick={() => handleDelete(tarefa.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="py-4 text-3xl text-primaryColor">Editar Tarefa</h2>
        <input
          type="text"
          name="nome"
          value={tarefaAtual?.nome || ""}
          onChange={handleEditChange}
          placeholder="Nome"
          className="my-4 border p-2 text-xl"
        />
        <input
          type="number"
          name="custo"
          value={tarefaAtual?.custo || ""}
          onChange={handleEditChange}
          placeholder="Custo"
          className="my-4 border p-2 text-xl"
        />
        <input
          type="date"
          name="dataLimite"
          value={tarefaAtual?.dataLimite || ""}
          onChange={handleEditChange}
          className="my-4 border p-2 text-xl"
        />
        <button
          onClick={handleSubmit}
          className="mx-4 rounded-md bg-primaryColor p-2 text-white"
        >
          Submit
        </button>
      </Modal>
    </div>
  );
}
