import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { UserId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";

export async function create(
    email: string,
    hashedPassword: string,
    executor: Executor = db,
) {
    const existing = await executor
        .selectFrom(TABLE_NAMES.users)
        .where("email", "=", email)
        .select("user_id")
        .executeTakeFirst();

    if (existing) {
        return { user_id: null };
    }

    const { user_id } = await executor
        .insertInto(TABLE_NAMES.users)
        .values({
            email,
            hashed_password: hashedPassword,
        })
        .returning("user_id")
        .executeTakeFirstOrThrow();

    return { user_id: user_id as UserId };
}
