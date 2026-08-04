import z from "zod";
import { BoardTemplateId, TaskStateId } from "@/shared/types";

export const user = z.object({
    email: z.string(),
    password: z.string().min(6).max(100),
    board_template_id: z.uuid().transform((id) => id as BoardTemplateId),
});
export type UserBody = z.infer<typeof user>;

export const task_id = z.object({
    task_id: z.uuid().transform((id) => id as TaskStateId),
});
export type TaskId = z.infer<typeof task_id>;

// Selects a board *template* to switch the session's active board to.
export const board_id = z.object({
    board_id: z.uuid().transform((id) => id as BoardTemplateId),
});
export type BoardId = z.infer<typeof board_id>;

export const position = z.object({ position: z.number().int().nonnegative() });
export type Position = z.infer<typeof position>;
