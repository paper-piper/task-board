import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Board, BoardStateId } from "@/shared/types";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";
import { buildBoardStateTasks } from "./buildBoardStateTasks";

export async function getBoardState(
    board_state_id: BoardStateId,
    executor: Kysely<DB> | Transaction<DB> = db,
    forUpdate = false,
): Promise<Board> {
    let board_query = executor
        .selectFrom(TABLE_NAMES.board_states)
        .where("board_state_id", "=", board_state_id)
        .select(["budget", "value", "board_state_id", "name", "created_at"]);
    if (forUpdate) {
        board_query = board_query.forUpdate();
    }
    const board_details = await board_query.executeTakeFirstOrThrow();

    return await buildBoardStateTasks(
        {
            ...board_details,
            board_state_id: board_details.board_state_id as BoardStateId,
        },
        executor,
    );
}
