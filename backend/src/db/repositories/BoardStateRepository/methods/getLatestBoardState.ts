import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";
import { BoardStateId, BoardTemplateId, UserId } from "@/shared/types";
import { buildBoardStateTasks } from "./buildBoardStateTasks";

export async function getLatestBoardState(
    board_template_id: BoardTemplateId,
    user_id: UserId,
    executor: Kysely<DB> | Transaction<DB> = db,
) {
    const board_details = await executor
        .selectFrom(TABLE_NAMES.board_states)
        .where("board_template_id", "=", board_template_id)
        .where("user_id", "=", user_id)
        .select(["budget", "value", "board_state_id", "name", "created_at"])
        .orderBy("created_at", "desc")
        .executeTakeFirstOrThrow();

    return await buildBoardStateTasks(
        {
            ...board_details,
            board_state_id: board_details.board_state_id as BoardStateId,
        },
        executor,
    );
}
