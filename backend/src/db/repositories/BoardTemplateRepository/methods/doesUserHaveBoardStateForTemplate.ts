import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";
import { BoardTemplateId } from "@/shared/types";

export async function doesUserHaveBoardStateForTemplate(
    board_template_id: BoardTemplateId,
    executor: Kysely<DB> | Transaction<DB> = db,
) {
    const board = await executor
        .selectFrom(TABLE_NAMES.board_states)
        .where("board_template_id", "=", board_template_id)
        .select("board_template_id")
        .executeTakeFirst();

    return board !== undefined;
}
