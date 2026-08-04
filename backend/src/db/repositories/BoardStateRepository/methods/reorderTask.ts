import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { BoardStateId, TaskStateId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";

export async function reorderTask(
    board_state_id: BoardStateId,
    task_id: TaskStateId,
    old_pos: number,
    new_pos: number,
    executor: Executor = db,
) {
    // bonus: Transaction parameter can be simplified or changed? need to ask eli
    const lo = Math.min(old_pos, new_pos).toString();
    const hi = Math.max(old_pos, new_pos).toString();
    const direction = (old_pos < new_pos ? -1 : 1).toString();

    await executor
        .updateTable(TABLE_NAMES.task_states)
        .set((eb) => ({
            position: eb("position", "+", direction),
        }))
        .where("board_state_id", "=", board_state_id)
        .where("task_state_id", "!=", task_id)
        .where("position", ">=", lo)
        .where("position", "<=", hi)
        .execute();

    await executor
        .updateTable(TABLE_NAMES.task_states)
        .set({ position: new_pos })
        .where("board_state_id", "=", board_state_id)
        .where("task_state_id", "=", task_id)
        .execute();
}
