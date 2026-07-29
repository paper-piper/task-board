import { SessionRepository } from "@/db/repositories/SessionRepository";
import type { Json } from "@/db/schema";

export class PgSessionStore {
    async get(sid: string) {
        const session = await SessionRepository.getSession(sid);

        if (!session || session.expires_at < new Date()) {
            return null;
        }
        return session.session;
    }

    async set(sid: string, session: Json, maxAge: number) {
        const expiresAt = new Date(Date.now() + maxAge);
        await SessionRepository.setSession(sid, session, expiresAt);
    }

    async destroy(sid: string) {
        await SessionRepository.deleteSession(sid);
    }
}
