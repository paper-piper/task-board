import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";

export async function getUser(email: string) {
    const user = await db
        .selectFrom(TABLE_NAMES.users)
        .where("email", "=", email)
        .select(["user_id", "hashed_password"])
        .executeTakeFirst();

    return user ?? null;
}
