import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "../schema";

export const UserRepository = {
    async create(
        email: string,
        hashedPassword: string,
        executor: Kysely<DB> | Transaction<DB> = db,
    ) {
        const existing = await executor
            .selectFrom(TABLE_NAMES.users)
            .where("email", "=", email)
            .select("user_id")
            .executeTakeFirst();

        if (existing) {
            return { user_id: null };
        }

        const user_id = await executor
            .insertInto(TABLE_NAMES.users)
            .values({
                email,
                hashed_password: hashedPassword,
            })
            .returning("user_id")
            .executeTakeFirstOrThrow();

        return user_id;
    },

    async delete(user_id: string) {
        await db
            .deleteFrom(TABLE_NAMES.users)
            .where("user_id", "=", user_id)
            .execute();
    },

    async getUser(email: string) {
        const user = await db
            .selectFrom(TABLE_NAMES.users)
            .where("email", "=", email)
            .select(["user_id", "hashed_password"])
            .executeTakeFirst();

        return user ?? null;
    },

    async doesExist(user_id: string) {
        const user = await db
            .selectFrom(TABLE_NAMES.users)
            .where("user_id", "=", user_id)
            .select("user_id")
            .executeTakeFirst();

        return user !== undefined;
    },
};
