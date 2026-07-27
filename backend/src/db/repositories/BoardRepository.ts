import { db } from "@/db/buildDb";
import { Board } from "@/shared/types";

export const BoardRepository = {
  async getBoard(user_id: string): Promise<Board> {
    const user = await db
      .selectFrom("users")
      .where("user_id", "=", user_id)
      .select("board_id")
      .executeTakeFirstOrThrow();

    const board_details = await db
      .selectFrom("boards")
      .where("board_id", "=", user.board_id)
      .select(["budget", "value"])
      .executeTakeFirstOrThrow();

    const tasks = await db
      .selectFrom("tasks")
      .where("board_id", "=", user.board_id)
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
      cost: board_details.budget,
      value: board_details.value,
      tasks,
    };
  },

  async createBoard(user_id: string, budget: number) {
    const board = await db
      .insertInto("boards")
      .values({
        user_id,
        budget,
        value: 0,
      })
      .returning("board_id")
      .executeTakeFirstOrThrow();

    await db
      .updateTable("users")
      .set({ board_id: board.board_id })
      .where("user_id", "=", user_id)
      .execute();
  },
};
