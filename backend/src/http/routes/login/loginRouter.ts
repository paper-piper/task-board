import Router from "@koa/router";
import { createEdgeController } from "./controllers/loginController";
import { deleteEdgeController } from "./controllers/signUpController";
import { validate } from "@/http/middlewares/validation/validator";
import { edge_z } from "@/http/middlewares/validation/schemas";

export function createEdgesRouter() {
  const router = new Router();
  router.post("/", validate(edge_z, "body"), createEdgeController);
  router.delete(
    "/:source_node_title/:target_node_title",
    validate(edge_z, "params"),
    deleteEdgeController,
  );
  return router;
}
