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

        return await this.buildBoardStateTasks(board_details, executor);
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

        return await this.buildBoardStateTasks(board_details, executor);
    },

    async buildBoardStateTasks(
        board_details: {
            board_state_id: string;
            name: string;
            budget: string | number;
            value: string | number;
            created_at: Date;
        },
        executor: Kysely<DB> | Transaction<DB> = db,
    ): Promise<Board> {
        // TODO: build board by positions
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
            ])
            .orderBy("position")
            .execute();

        return {
            id: board_details.board_state_id,
            name: board_details.name,
            budget: Number(board_details.budget),
            value: Number(board_details.value),
            tasks: tasks.map(mapTaskRow), // TODO: make a funciton and not map function?
            created_at: board_details.created_at,
        };
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
    async applyTaskExecution(
        board_state_id: string,
        cost: number,
        value: number,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        // TODO: Duplicate this on new state
        // TODO: make duplicating and applying a function
        await executor
            .updateTable(TABLE_NAMES.board_states)
            .set((eb) => ({
                budget: eb("budget", "-", cost.toString()),
                value: eb("value", "+", value.toString()),
            }))
            .where("board_state_id", "=", board_state_id)
            .execute();
    },
};
