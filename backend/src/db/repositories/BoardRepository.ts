import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Board } from "@/shared/types";
import { mapTaskRow } from "@/db/repositories/mappers/taskMapper";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";

export const BoardRepository = {
    async getBoard(
        user_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
        forUpdate = false,
    ): Promise<Board> {
        let board_query = executor
            .selectFrom(TABLE_NAMES.boards)
            .where("user_id", "=", user_id)
            .select(["budget", "value", "board_id"]);
        if (forUpdate) {
            board_query = board_query.forUpdate();
        }
        const board_details = await board_query.executeTakeFirstOrThrow();

        const tasks = await executor
            .selectFrom(TABLE_NAMES.tasks)
            .where("board_id", "=", board_details.board_id)
            .select([
                "task_id as id",
                "code",
                "title",
                "cost",
                "value",
                "steps",
                "predecessors_ids",
                "completed",
            ])
            .execute();

        return {
            budget: Number(board_details.budget),
            value: Number(board_details.value),
            tasks: tasks.map(mapTaskRow),
        };
    },

    async createBoard(
        user_id: string,
        budget: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        return await executor
            .insertInto(TABLE_NAMES.boards)
            .values({
                user_id,
                budget,
                value: 0,
            })
            .returning("board_id")
            .executeTakeFirstOrThrow();
    },
    async applyTaskExecution(
        user_id: string,
        cost: number,
        value: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        await executor
            .updateTable(TABLE_NAMES.boards)
            .set((eb) => ({
                budget: eb("budget", "-", cost.toString()),
                value: eb("value", "+", value.toString()),
            }))
            .where("user_id", "=", user_id)
            .execute();
    },
};
