import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function applyTaskExecution(
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
}
