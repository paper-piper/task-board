import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { UserId } from "@/shared/types";

export async function getUser(email: string) {
    const user = await db
        .selectFrom(TABLE_NAMES.users)
        .where("email", "=", email)
        .select(["user_id", "hashed_password"])
        .executeTakeFirst();

    if (!user) return null;

    return { ...user, user_id: user.user_id as UserId };
}
