import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { TaskStateId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";

export async function markTaskCompleted(
    task_state_id: TaskStateId,
    executor: Executor = db,
) {
    await executor
        .updateTable(TABLE_NAMES.task_states)
        .set({ completed: true })
        .where("task_state_id", "=", task_state_id)
        .executeTakeFirstOrThrow();
}
