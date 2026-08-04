import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { SessionId } from "@/shared/types";

export function getSession(sessionId: SessionId) {
    return db
        .selectFrom(TABLE_NAMES.sessions)
        .selectAll()
        .where("session_id", "=", sessionId)
        .executeTakeFirst();
}
