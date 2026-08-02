import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";
import { BoardMetadata } from "@/shared/types";

export const BoardTemplateRepository = {
    async createBoardFromTemplate(
        board_template_id: string,
        user_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const template_board = await executor
            .selectFrom(TABLE_NAMES.board_templates)
            .where("board_template_id", "=", board_template_id)
            .select(["name", "budget", "value", "board_template_id"])
            .executeTakeFirstOrThrow();

        const board_state_id = crypto.randomUUID();

        await executor
            .insertInto(TABLE_NAMES.board_states)
            .values({
                board_state_id,
                board_template_id: template_board.board_template_id,
                user_id: user_id,
                name: template_board.name,
                budget: template_board.budget,
                value: template_board.value,
            })
            .execute();

        const template_tasks = await executor
            .selectFrom(TABLE_NAMES.task_templates)
            .where("board_template_id", "=", board_template_id)
            .select([
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

        if (template_tasks.length > 0) {
            const new_tasks = await executor
                .insertInto(TABLE_NAMES.task_states)
                .values(
                    template_tasks.map(({ predecessors_ids, ...task }) => ({
                        ...task,
                        board_state_id,
                        predecessors_ids: null,
                    })),
                )
                .returning(["task_state_id", "task_template_id"])
                .execute();

            const templateIdToNewTaskId = new Map(
                new_tasks.map((task) => [
                    task.task_template_id,
                    task.task_state_id,
                ]),
            );

            for (const task of template_tasks) {
                if (
                    !task.predecessors_ids ||
                    task.predecessors_ids.length === 0
                ) {
                    continue;
                }

                const new_predecessors_ids = task.predecessors_ids
                    .map((template_id) =>
                        templateIdToNewTaskId.get(template_id),
                    )
                    .filter((id): id is string => id !== undefined);

                await executor
                    .updateTable(TABLE_NAMES.task_states)
                    .set({ predecessors_ids: new_predecessors_ids })
                    .where(
                        "task_state_id",
                        "=",
                        templateIdToNewTaskId.get(task.task_template_id)!,
                    )
                    .execute();
            }
        }
    },

    async getBoardSchemas(
        executor: Kysely<DB> | Transaction<DB> = db,
    ): Promise<BoardMetadata[]> {
        const boards = await executor
            .selectFrom(TABLE_NAMES.board_templates)
            .select(["board_template_id as id", "name", "budget", "value"])
            .execute();

        const board_ids = boards.map((b) => b.id);
        const task_counts = await executor
            .selectFrom(TABLE_NAMES.task_templates)
            .where("board_template_id", "in", board_ids)
            .select([
                "board_template_id",
                (eb) => eb.fn.count("board_template_id").as("task_count"),
            ])
            .groupBy("board_template_id")
            .execute();

        return boards.map((b): BoardMetadata => ({
            ...b,
            budget: Number(b.budget),
            value: Number(b.value),
            task_count: Number(
                task_counts.find((t) => t.board_template_id === b.id)
                    ?.task_count ?? 0,
            ),
        }));
    },
};
