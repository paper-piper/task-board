import Router from "@koa/router";
import { requireAuth } from "@/http/middlewares/auth/requireAuth";
import { executeTaskController } from "./controllers/executeTaskController";
import {
    position,
    task_id,
} from "@/http/middlewares/content_validation/schemas";
import { validate } from "@/http/middlewares/content_validation/validator";
import { reorderTaskController } from "./controllers/reorderTaskController";

export function createTaskRouter() {
    const router = new Router();
    router.post(
        "execute/:task_id",
        validate(task_id, "params"),
        requireAuth,
        executeTaskController,
    );
    router.post(
        "reorder/:task_id",
        validate(task_id, "params"),
        validate(position, "body"),
        requireAuth,
        reorderTaskController,
    );
    return router;
}
