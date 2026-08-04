import { db } from "@/db/buildDb";
import { Json } from "@/db/schema";
import { TABLE_NAMES } from "@/db/tableNames";

export async function setSession(
    sessionId: string,
    session: Json,
    expiresAt: Date,
) {
    await db
        .insertInto(TABLE_NAMES.sessions)
        .values({ session_id: sessionId, session, expires_at: expiresAt })
        .onConflict((oc) =>
            oc
                .column("session_id")
                .doUpdateSet({ session, expires_at: expiresAt }),
        )
        .execute();
}
