import Router from "@koa/router";
import { getBoardController } from "./controllers/getBoardController";
import { requireAuth } from "@/http/middlewares/auth/requireAuth";
import { getBoardsMetadataController } from "./controllers/getBoardsMetadata";
import { validate } from "@/http/middlewares/content_validation/validator";
import { board_id } from "@/http/middlewares/content_validation/schemas";
import { SelectBoardController } from "./controllers/selectBoardController";

export function createBoardRouter() {
    const router = new Router();
    router.get("/current", requireAuth, getBoardController);
    router.post(
        "/select",
        requireAuth,
        validate(board_id, "body"),
        SelectBoardController,
    );
    router.get("/", getBoardsMetadataController);
    return router;
}
