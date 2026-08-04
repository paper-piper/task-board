import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function duplicateBoardState(
    board_state_id: string,
    executor: Kysely<DB> | Transaction<DB> = db,
): Promise<string> {
    const board = await executor
        .selectFrom(TABLE_NAMES.board_states)
        .where("board_state_id", "=", board_state_id)
        .select(["board_template_id", "budget", "value", "name", "user_id"])
        .executeTakeFirstOrThrow();

    const newBoard = await executor
        .insertInto(TABLE_NAMES.board_states)
        .values(board)
        .returning("board_state_id")
        .executeTakeFirstOrThrow();

    const tasks = await executor
        .selectFrom(TABLE_NAMES.task_states)
        .where("board_state_id", "=", board_state_id)
        .select([
            "task_state_id",
            "task_template_id",
            "code",
            "title",
            "cost",
            "value",
            "steps",
            "predecessors_ids",
            "completed",
            "position",
        ])
        .execute();

    if (tasks.length > 0) {
        const newTasks = await executor
            .insertInto(TABLE_NAMES.task_states)
            .values(
                tasks.map(
                    ({ task_state_id, predecessors_ids, ...task }) => ({
                        ...task,
                        board_state_id: newBoard.board_state_id,
                        predecessors_ids: null,
                    }),
                ),
            )
            .returning(["task_state_id", "task_template_id"])
            .execute();

        const templateIdToNewTaskId = new Map(
            newTasks.map((task) => [
                task.task_template_id,
                task.task_state_id,
            ]),
        );
        const oldTaskIdToTemplateId = new Map(
            tasks.map((task) => [
                task.task_state_id,
                task.task_template_id,
            ]),
        );

        for (const task of tasks) {
            if (
                !task.predecessors_ids ||
                task.predecessors_ids.length === 0
            ) {
                continue;
            }

            const newPredecessorsIds = task.predecessors_ids
                .map((oldPredecessorId) =>
                    templateIdToNewTaskId.get(
                        oldTaskIdToTemplateId.get(oldPredecessorId)!,
                    ),
                )
                .filter((id): id is string => id !== undefined);

            await executor
                .updateTable(TABLE_NAMES.task_states)
                .set({ predecessors_ids: newPredecessorsIds })
                .where(
                    "task_state_id",
                    "=",
                    templateIdToNewTaskId.get(task.task_template_id)!,
                )
                .execute();
        }
    }

    return newBoard.board_state_id;
}
