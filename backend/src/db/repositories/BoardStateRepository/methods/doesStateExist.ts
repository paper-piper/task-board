import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";
import { BoardStateId } from "@/shared/types";

export async function doesStateExist(
    board_state_id: BoardStateId,
    executor: Kysely<DB> | Transaction<DB> = db,
) {
    const board = await executor
        .selectFrom(TABLE_NAMES.board_states)
        .where("board_state_id", "=", board_state_id)
        .select("board_state_id")
        .executeTakeFirst();

    return board !== undefined;
}
