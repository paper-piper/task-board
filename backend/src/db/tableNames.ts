import { DB } from "@/db/schema";

export const TABLE_NAMES = {
    boards: "boards",
    sessions: "sessions",
    tasks: "tasks",
    users: "users",
} as const satisfies Record<keyof DB, keyof DB>;
