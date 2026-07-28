import { db } from "@/db/buildDb";
import { BoardRepository } from "@/db/repositories/BoardRepository";

export const UserRepository = {
  async create(email: string, hashedPassword: string) {
    const existing = await db
      .selectFrom("users")
      .where("email", "=", email)
      .select("user_id")
      .executeTakeFirst();

    if (existing) {
      return { user_id: null };
    }

    const user_id = await db
      .insertInto("users")
      .values({
        email,
        hashed_password: hashedPassword,
      })
      .returning("user_id")
      .executeTakeFirstOrThrow();

    await BoardRepository.createBoard(user_id.user_id, 1000); // TODO global budget for new users

    return user_id;
  },

  async delete(user_id: string) {
    await db.deleteFrom("users").where("user_id", "=", user_id).execute();
  },

  async login(email: string) {
    const user = await db
      .selectFrom("users")
      .where("email", "=", email)
      .select(["user_id", "hashed_password"])
      .executeTakeFirst();

    return user ?? null;
  },
};
