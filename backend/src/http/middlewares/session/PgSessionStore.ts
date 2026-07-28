import { Kysely } from "kysely";
import type { DB, Json } from "@/db/schema";
import { any } from "zod";

export class PgSessionStore {
  constructor(private db: Kysely<DB>) {}

  async get(sid: string) {
    const session = await this.db
      .selectFrom("sessions")
      .selectAll()
      .where("session_id", "=", sid)
      .executeTakeFirst();

    if (!session || session.expires_at < new Date()) {
      return null;
    }
    return session;
  }

  async set(sid: string, session: unknown, opts: { maxAge?: number }) {
    const expiresAt = opts.maxAge
      ? new Date(Date.now() + opts.maxAge)
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // default to 1 day
    await this.db
      .insertInto("sessions")
      .values({
        session_id: sid,
        session: session as any,
        expires_at: expiresAt,
      })
      .onConflict((oc) =>
        oc
          .column("session_id")
          .doUpdateSet({ session: session as any, expires_at: expiresAt }),
      )
      .execute();
  }

  async destroy(sid: string) {
    await this.db
      .deleteFrom("sessions")
      .where("session_id", "=", sid)
      .execute();
  }
}
