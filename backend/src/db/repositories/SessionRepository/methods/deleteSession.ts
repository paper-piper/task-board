import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { SessionId } from "@/shared/types";

export async function deleteSession(sessionId: SessionId) {
    await db
        .deleteFrom(TABLE_NAMES.sessions)
        .where("session_id", "=", sessionId)
        .execute();
}
