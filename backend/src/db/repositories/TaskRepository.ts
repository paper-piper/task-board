import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { mapTaskRow } from "@/db/repositories/mappers/taskMapper";
import { sampleTasks } from "@/db/sampleData/sampleTasks";
import { Task } from "@/shared/types";
import { Kysely, Transaction } from "kysely";
import { randomUUID } from "node:crypto";
import { DB } from "../schema";

export const TaskRepository = {
    async getTask(
        board_id: string,
        task_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
        forUpdate = false,
    ): Promise<Task | null> {
        const board = await executor
            .selectFrom(TABLE_NAMES.boards)
            .select("board_id")
            .where("board_id", "=", board_id)
            .executeTakeFirst();

        if (!board) return null;

        let task_query = executor
            .selectFrom(TABLE_NAMES.tasks)
            .where("board_id", "=", board.board_id)
            .where("task_id", "=", task_id)
            .select([
                "task_id as id",
                "code",
                "title",
                "cost",
                "value",
                "steps",
                "predecessors_ids",
                "completed",
            ]);
        if (forUpdate) {
            task_query = task_query.forUpdate();
        }
        const task_row = await task_query.executeTakeFirst();

        if (!task_row) return null;

        return mapTaskRow(task_row);
    },
    async markTaskCompleted(
        task_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        await executor
            .updateTable(TABLE_NAMES.tasks)
            .set({ completed: true })
            .where("tasks.task_id", "=", task_id)
            .executeTakeFirstOrThrow();
    },
    async populateBoard(
        board_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const board = await executor
            .selectFrom(TABLE_NAMES.boards)
            .select("user_id")
            .where("board_id", "=", board_id)
            .executeTakeFirstOrThrow();

        const task_ids = new Map(
            sampleTasks.map((task) => [task.id, randomUUID()]),
        );

        await executor
            .insertInto(TABLE_NAMES.tasks)
            .values(
                sampleTasks.map((task, index) => ({
                    task_id: task_ids.get(task.id),
                    board_id,
                    user_id: board.user_id,
                    position: index,
                    code: task.code,
                    title: task.title,
                    cost: task.cost,
                    value: task.value,
                    steps: task.steps,
                    predecessors_ids: task.predecessors_ids?.map((id) =>
                        task_ids.get(id)!,
                    ),
                })),
            )
            .execute();
    },
};
