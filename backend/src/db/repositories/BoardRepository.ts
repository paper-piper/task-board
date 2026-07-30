import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { BoardMetadata } from "@/shared/types";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";

export const BoardRepository = {
    async applyTaskExecution(
        board_state_id: string,
        cost: number,
        value: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        await executor
            .updateTable(TABLE_NAMES.board_states)
            .set((eb) => ({
                budget: eb("budget", "-", cost.toString()),
                value: eb("value", "+", value.toString()),
            }))
            .where("board_state_id", "=", board_state_id)
            .execute();
    },

    async reorderTask(
        board_state_id: string,
        task_id: string,
        old_pos: number,
        new_pos: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const lo = Math.min(old_pos, new_pos);
        const hi = Math.max(old_pos, new_pos);
        const direction = old_pos < new_pos ? -1 : 1;

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
    },
};
