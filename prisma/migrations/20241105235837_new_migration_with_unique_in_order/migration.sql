/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tarefa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Tarefa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tarefa_name_key` ON `Tarefa`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Tarefa_order_key` ON `Tarefa`(`order`);
