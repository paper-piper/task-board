import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Board, BoardMetadata } from "@/shared/types";
import { mapTaskRow } from "@/db/repositories/mappers/taskMapper";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";

export const BoardRepository = {
    async getBoardsMetadata(
        executor: Kysely<DB> | Transaction<DB> = db,
    ): Promise<BoardMetadata[]> {
        const boards = await executor
            .selectFrom(TABLE_NAMES.boards)
            .select(["board_id as id", "name", "budget", "value", "created_at"])
            .execute();

        const board_ids = boards.map((b) => b.id);
        const task_counts = await executor
            .selectFrom(TABLE_NAMES.tasks)
            .where("board_id", "in", board_ids)
            .select([
                "board_id",
                (eb) => eb.fn.count("task_id").as("task_count"),
            ])
            .groupBy("board_id")
            .execute();

        return boards.map((b): BoardMetadata => ({
            ...b,
            budget: Number(b.budget),
            value: Number(b.value),
            task_count: Number(
                task_counts.find((t) => t.board_id === b.id)?.task_count ?? 0,
            ),
        }));
    },

    async doesExist(
        board_id: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const board = await executor
            .selectFrom(TABLE_NAMES.boards)
            .where("board_id", "=", board_id)
            .select("board_id")
            .executeTakeFirst();

        return board !== undefined;
    },

    async getBoard(
        board_id: string,
        executor: Kysely<DB> | Transaction<DB> = db, // TODO: take a look at options to improve this pattern or not use db completely
        forUpdate = false,
    ): Promise<Board> {
        // TODO: build board by positions
        let board_query = executor
            .selectFrom(TABLE_NAMES.boards)
            .where("board_id", "=", board_id)
            .select(["budget", "value", "board_id", "name", "created_at"]);
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
            .orderBy("position")
            .execute();

        return {
            id: board_details.board_id,
            name: board_details.name,
            budget: Number(board_details.budget),
            value: Number(board_details.value),
            tasks: tasks.map(mapTaskRow), // TODO: make a funciton and not map function?
            created_at: board_details.created_at,
        };
    },

    async createBoard(
        user_id: string,
        name: string,
        budget: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        return await executor
            .insertInto(TABLE_NAMES.boards)
            .values({
                user_id,
                name,
                budget,
                value: 0,
            })
            .returning("board_id")
            .executeTakeFirstOrThrow();
    },
    async applyTaskExecution(
        board_id: string,
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
            .where("board_id", "=", board_id)
            .execute();
    },

    async reorderTask(
        board_id: string,
        task_id: string,
        old_pos: number,
        new_pos: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const lo = Math.min(old_pos, new_pos);
        const hi = Math.max(old_pos, new_pos);
        const direction = old_pos < new_pos ? -1 : 1;

        await executor
            .updateTable(TABLE_NAMES.tasks)
            .set((eb) => ({
                position: eb("position", "+", direction),
            }))
            .where("board_id", "=", board_id)
            .where("task_id", "!=", task_id)
            .where("position", ">=", lo)
            .where("position", "<=", hi)
            .execute();

        await executor
            .updateTable(TABLE_NAMES.tasks)
            .set({ position: new_pos })
            .where("board_id", "=", board_id)
            .where("task_id", "=", task_id)
            .execute();
    },
};
