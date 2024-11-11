import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Removendo o select para trazer todos os campos
    const tarefas = await prisma.tarefa.findMany({
      orderBy: {
        order: "asc",
      },
    });

    const formatadas = tarefas.map((tarefa) => ({
      id: tarefa.id,
      name: tarefa.name,
      preco: tarefa.preco,
      data: tarefa.data,
      ordem: tarefa.order,
    }));

    return NextResponse.json(formatadas, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
