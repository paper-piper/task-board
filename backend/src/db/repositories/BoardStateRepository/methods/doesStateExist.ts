import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function doesStateExist(
    board_state_id: string,
    executor: Kysely<DB> | Transaction<DB> = db,
) {
    const board = await executor
        .selectFrom(TABLE_NAMES.board_states)
        .where("board_state_id", "=", board_state_id)
        .select("board_state_id")
        .executeTakeFirst();

    return board !== undefined;
}
