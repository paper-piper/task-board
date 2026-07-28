import Router from "@koa/router";
import { getBoardController } from "./controllers/getBoardController";
import { validate } from "@/http/middlewares/content_validation/validator";

export function createBoardRouter() {
  const router = new Router();
  router.get("/", getBoardController);
  // TODO: validation logic for cookie?
  return router;
}
