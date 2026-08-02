import Router from "@koa/router";
import { loginController } from "./controllers/loginController";
import { registerController } from "./controllers/registerController";
import { validate } from "@/http/middlewares/content_validation/validator";
import { user } from "@/http/middlewares/content_validation/schemas";

export function createAuthRouter() {
    const router = new Router();
    router.post("/login", validate(user, "body"), loginController);
    router.post("/register", validate(user, "body"), registerController);
    return router;
}
