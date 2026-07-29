import Router from "@koa/router";
import { getBoardController } from "./controllers/getBoardController";
import { requireAuth } from "@/http/middlewares/auth/requireAuth";

export function createBoardRouter() {
    const router = new Router();
    router.get("/", requireAuth, getBoardController);
    return router;
}
