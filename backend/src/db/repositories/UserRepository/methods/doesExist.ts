import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";

export async function doesExist(user_id: string) {
    const user = await db
        .selectFrom(TABLE_NAMES.users)
        .where("user_id", "=", user_id)
        .select("user_id")
        .executeTakeFirst();

    return user !== undefined;
}
