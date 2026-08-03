import z from "zod";

export const user = z.object({
    email: z.string(),
    password: z.string().min(6).max(100),
    board_template_id: z.uuid(),
});
export type UserBody = z.infer<typeof user>;

export const task_id = z.object({ task_id: z.uuid() });
export type TaskId = z.infer<typeof task_id>;

export const board_id = z.object({ board_id: z.uuid() });
export type BoardId = z.infer<typeof board_id>;

// Positions are 1-based, matching how they are stored in the DB.
export const position = z.object({ position: z.number().int().positive() });
export type Position = z.infer<typeof position>;
