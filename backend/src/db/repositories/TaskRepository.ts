import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { mapTaskRow } from "@/db/repositories/mappers/taskMapper";
import { Task } from "@/shared/types";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";

export const TaskRepository = {
    async getTaskFromPrevState(
        board_state_id: string,
        task_state_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
        forUpdate = false,
    ): Promise<Task | null> {
        const task_template = await executor
            .selectFrom(TABLE_NAMES.task_states)
            .select("task_template_id")
            .where("task_state_id", "=", task_state_id)
            .executeTakeFirst();

        if (!task_template) return null;

        let task_query = executor
            .selectFrom(TABLE_NAMES.task_states)
            .where("board_state_id", "=", board_state_id)
            .where("task_template_id", "=", task_template.task_template_id)
            .select([
                "task_state_id as id",
                "code",
                "title",
                "cost",
                "value",
                "steps",
                "predecessors_ids",
                "completed",
                "position",
            ]);
        if (forUpdate) {
            task_query = task_query.forUpdate();
        }
        const task_row = await task_query.executeTakeFirst();

        if (!task_row) return null;

        return mapTaskRow([task_row])[0];
    },
    async markTaskCompleted(
        task_state_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        await executor
            .updateTable(TABLE_NAMES.task_states)
            .set({ completed: true })
            .where("task_state_id", "=", task_state_id)
            .executeTakeFirstOrThrow();
    },
};
