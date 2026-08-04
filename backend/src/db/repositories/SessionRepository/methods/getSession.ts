import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";

export function getSession(sessionId: string) {
    return db
        .selectFrom(TABLE_NAMES.sessions)
        .selectAll()
        .where("session_id", "=", sessionId)
        .executeTakeFirst();
}
