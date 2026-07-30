import z from "zod";

export const user = z.object({
    email: z.string(),
    password: z.string().min(6).max(100),
    board_template_id: z.uuid(),
});

export const task_id = z.object({ task_id: z.uuid() });

export const board_id = z.object({ board_id: z.uuid() });
export const position = z.object({ position: z.number().positive() });
