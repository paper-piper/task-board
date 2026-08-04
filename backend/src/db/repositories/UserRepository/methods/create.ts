import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function create(
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
}
