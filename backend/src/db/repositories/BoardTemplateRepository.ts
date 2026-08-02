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

        await executor
            .insertInto(TABLE_NAMES.board_states)
            .values({
                board_state_id: crypto.randomUUID(),
                board_template_id: template_board.board_template_id,
                user_id: user_id,
                name: template_board.name,
                budget: template_board.budget,
                value: template_board.value,
            })
            .execute();
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
