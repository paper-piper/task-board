import { db } from "@/db/buildDb";
import { Json } from "@/db/schema";
import { TABLE_NAMES } from "@/db/tableNames";

export const SessionRepository = {
    async getSession(sessionId: string) {
        return db
            .selectFrom(TABLE_NAMES.sessions)
            .selectAll()
            .where("session_id", "=", sessionId)
            .executeTakeFirst();
    },

    async setSession(sessionId: string, session: Json, expiresAt: Date) {
        await db
            .insertInto(TABLE_NAMES.sessions)
            .values({ session_id: sessionId, session, expires_at: expiresAt })
            .onConflict((oc) =>
                oc
                    .column("session_id")
                    .doUpdateSet({ session, expires_at: expiresAt }),
            )
            .execute();
    },

    async deleteSession(sessionId: string) {
        await db
            .deleteFrom(TABLE_NAMES.sessions)
            .where("session_id", "=", sessionId)
            .execute();
    },
};
