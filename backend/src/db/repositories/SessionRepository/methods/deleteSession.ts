import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";

export async function deleteSession(sessionId: string) {
    await db
        .deleteFrom(TABLE_NAMES.sessions)
        .where("session_id", "=", sessionId)
        .execute();
}
