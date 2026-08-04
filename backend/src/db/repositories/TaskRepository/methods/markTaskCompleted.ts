import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function markTaskCompleted(
    task_state_id: string,
    executor: Kysely<DB> | Transaction<DB> = db,
) {
    await executor
        .updateTable(TABLE_NAMES.task_states)
        .set({ completed: true })
        .where("task_state_id", "=", task_state_id)
        .executeTakeFirstOrThrow();
}
