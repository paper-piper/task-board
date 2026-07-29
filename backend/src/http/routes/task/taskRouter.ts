import Router from "@koa/router";
import { requireAuth } from "@/http/middlewares/auth/requireAuth";
import { executeTaskController } from "./controllers/executeTaskController";
import { task_id } from "@/http/middlewares/content_validation/schemas";
import { validate } from "@/http/middlewares/content_validation/validator";

export function createTaskRouter() {
    const router = new Router();
    router.post(
        "/:task_id",
        validate(task_id, "params"),
        requireAuth,
        executeTaskController,
    );
    return router;
}
