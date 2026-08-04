import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { UserId } from "@/shared/types";
import { existsIn } from "@/db/repositories/shared/existsIn";

export async function doesExist(user_id: UserId) {
    return existsIn(TABLE_NAMES.users, "user_id", user_id, db);
}
