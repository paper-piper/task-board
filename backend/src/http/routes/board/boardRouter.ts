import Router from "@koa/router";
import { getBoardController } from "./controllers/getBoardController";
import { validate } from "@/http/middlewares/validation/validator";

export function createNodesRouter() {
  const router = new Router();
  router.get("/", getBoardController);
  // TODO: validation logic for cookie?
  return router;
}
