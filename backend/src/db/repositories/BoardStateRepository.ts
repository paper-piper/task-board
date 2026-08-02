import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Board } from "@/shared/types";
import { mapTaskRow } from "@/db/repositories/mappers/taskMapper";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";

export const BoardStateRepository = {
    async getLatestBoardState(
        board_template_id: string,
        user_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const board_details = await executor
            .selectFrom(TABLE_NAMES.board_states)
            .where("board_template_id", "=", board_template_id)
            .where("user_id", "=", user_id)
            .select(["budget", "value", "board_state_id", "name", "created_at"])
            .orderBy("created_at", "desc")
            .executeTakeFirstOrThrow();

        return await buildBoardStateTasks(board_details, executor);
    },

    async getBoardState(
        board_state_id: string,
        executor: Kysely<DB> | Transaction<DB> = db, // TODO: take a look at options to improve this pattern or not use db completely
        forUpdate = false,
    ): Promise<Board> {
        let board_query = executor
            .selectFrom(TABLE_NAMES.board_states)
            .where("board_state_id", "=", board_state_id)
            .select([
                "budget",
                "value",
                "board_state_id",
                "name",
                "created_at",
            ]);
        if (forUpdate) {
            board_query = board_query.forUpdate();
        }
        const board_details = await board_query.executeTakeFirstOrThrow();

        return await buildBoardStateTasks(board_details, executor);
    },

    async doesStateExist(
        board_state_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const board = await executor
            .selectFrom(TABLE_NAMES.board_states)
            .where("board_state_id", "=", board_state_id)
            .select("board_state_id")
            .executeTakeFirst();

        return board !== undefined;
    },

    async duplicateBoardState(
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
    },

    async applyTaskExecution(
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
    },

    async reorderTask(
        board_state_id: string,
        task_id: string,
        old_pos: number,
        new_pos: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        // TODO: ask big eli
        // TODO: Transaction parameter can be simplified or changed?
        const lo = Math.min(old_pos, new_pos).toString();
        const hi = Math.max(old_pos, new_pos).toString();
        const direction = (old_pos < new_pos ? -1 : 1).toString();

        await executor
            .updateTable(TABLE_NAMES.task_states)
            .set((eb) => ({
                position: eb("position", "+", direction),
            }))
            .where("board_state_id", "=", board_state_id)
            .where("task_state_id", "!=", task_id)
            .where("position", ">=", lo)
            .where("position", "<=", hi)
            .execute();

        await executor
            .updateTable(TABLE_NAMES.task_states)
            .set({ position: new_pos })
            .where("board_state_id", "=", board_state_id)
            .where("task_state_id", "=", task_id)
            .execute();
    },
};

async function buildBoardStateTasks(
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
