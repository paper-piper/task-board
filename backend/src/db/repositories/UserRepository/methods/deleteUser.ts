import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";

export async function deleteUser(user_id: string) {
    await db
        .deleteFrom(TABLE_NAMES.users)
        .where("user_id", "=", user_id)
        .execute();
}
