import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Board } from "@/shared/types";
import { mapTaskRow } from "@/db/repositories/mappers/taskMapper";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function buildBoardStateTasks(
    board_details: {
        board_state_id: string;
        name: string;
        budget: string | number;
        value: string | number;
        created_at: Date;
    },
    executor: Kysely<DB> | Transaction<DB> = db,
): Promise<Board> {
    const tasks = await executor
        .selectFrom(TABLE_NAMES.task_states)
        .where("board_state_id", "=", board_details.board_state_id)
        .select([
            "task_state_id as id",
            "code",
            "title",
            "cost",
            "value",
            "steps",
            "predecessors_ids",
            "completed",
            "position",
        ])
        .orderBy("position")
        .execute();

    const sorted_tasks = mapTaskRow(tasks).sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0),
    );

    return {
        id: board_details.board_state_id,
        name: board_details.name,
        budget: Number(board_details.budget),
        value: Number(board_details.value),
        tasks: sorted_tasks,
        created_at: board_details.created_at,
    };
}
