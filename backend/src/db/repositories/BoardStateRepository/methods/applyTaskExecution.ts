import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { BoardStateId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";

export async function applyTaskExecution(
    board_state_id: BoardStateId,
    cost: number,
    value: number,
    executor: Executor = db,
) {
    await executor
        .updateTable(TABLE_NAMES.board_states)
        .set((eb) => ({
            budget: eb("budget", "-", cost.toString()),
            value: eb("value", "+", value.toString()),
        }))
        .where("board_state_id", "=", board_state_id)
        .execute();
}
