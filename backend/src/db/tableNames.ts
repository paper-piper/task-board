import { DB } from "@/db/schema";

export const TABLE_NAMES = {
    board_states: "board_states",
    board_templates: "board_templates",
    sessions: "sessions",
    task_states: "task_states",
    task_templates: "task_templates",
    users: "users",
} as const satisfies Record<keyof DB, keyof DB>;
