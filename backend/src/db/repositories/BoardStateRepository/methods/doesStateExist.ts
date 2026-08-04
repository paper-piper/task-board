import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { BoardStateId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";
import { existsIn } from "@/db/repositories/shared/existsIn";

export async function doesStateExist(
    board_state_id: BoardStateId,
    executor: Executor = db,
) {
    return existsIn(
        TABLE_NAMES.board_states,
        "board_state_id",
        board_state_id,
        executor,
    );
}
