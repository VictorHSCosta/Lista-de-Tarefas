import { Usuario } from "~/core/models/Usuariio";

const USUARIOS: Usuario[] = [
  { id: 1, name: "João", preco: 100, data: new Date(), order: 1 },
  { id: 2, name: "Maria", preco: 200, data: new Date(), order: 2 },
  { id: 3, name: "José", preco: 300, data: new Date(), order: 3 },
  { id: 4, name: "Pedro", preco: 400, data: new Date(), order: 4 },
  { id: 5, name: "Ana", preco: 500, data: new Date(), order: 5 },
];

console.log(USUARIOS);
