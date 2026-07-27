import { sql } from "kysely";
import { db } from "@/db/buildDb";
import { BoardRepository } from "@/db/repositories/BoardRepository";

export const UserRepository = {
  async create(email: string, hashedPassword: string) {
    const user = await db
      .insertInto("users")
      .values({
        email,
        hashed_password: hashedPassword,
      })
      .returning("user_id")
      .executeTakeFirstOrThrow();

    await BoardRepository.createBoard(user.user_id, 1000); // TODO global budget for new users

    return user;
  },

  async delete(user_id: string) {
    await db.deleteFrom("users").where("user_id", "=", user_id).execute();
  },

  async login(email: string, hashedPassword: string) {
    const user = await db
      .selectFrom("users")
      .where("email", "=", email)
      .where("hashed_password", "=", hashedPassword)
      .select("user_id")
      .executeTakeFirstOrThrow();

    return user;
  },
};
