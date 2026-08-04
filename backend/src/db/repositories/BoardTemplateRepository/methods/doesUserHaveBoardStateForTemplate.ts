import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { BoardTemplateId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";
import { existsIn } from "@/db/repositories/shared/existsIn";

export async function doesUserHaveBoardStateForTemplate(
    board_template_id: BoardTemplateId,
    executor: Executor = db,
) {
    return existsIn(
        TABLE_NAMES.board_states,
        "board_template_id",
        board_template_id,
        executor,
    );
}
