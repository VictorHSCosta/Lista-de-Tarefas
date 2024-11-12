import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET
export async function GET() {
  try {
    const tarefas = await prisma.tarefa.findMany();
    return NextResponse.json(tarefas, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 },
    );
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const body: {
      name: string;
      preco: string;
      data: string;
      order: number;
    } = await request.json();
    const { name, preco, data, order } = body;

    if (!name || !preco || !data || order === undefined) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const novaTarefa = await prisma.tarefa.create({
      data: {
        name,
        preco: parseFloat(preco),
        data: new Date(data),
        order,
      },
    });

    return NextResponse.json(novaTarefa, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar tarefa" },
      { status: 500 },
    );
  }
}

// PUT
export async function PUT(request: NextRequest) {
  try {
    const body: {
      id: string;
      name?: string;
      preco?: string;
      data?: string;
      order?: string;
    } = await request.json();
    const { id, name, preco, data, order } = body;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: {
        name,
        preco: preco ? parseFloat(preco) : undefined,
        data: data ? new Date(data) : undefined,
        order: order ? parseInt(order) : undefined,
      },
    });

    return NextResponse.json(tarefaAtualizada, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await prisma.tarefa.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Tarefa deletada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar tarefa" },
      { status: 500 },
    );
  }
}
