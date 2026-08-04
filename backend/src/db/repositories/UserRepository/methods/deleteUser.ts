import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { UserId } from "@/shared/types";

export async function deleteUser(user_id: UserId) {
    await db
        .deleteFrom(TABLE_NAMES.users)
        .where("user_id", "=", user_id)
        .execute();
}
