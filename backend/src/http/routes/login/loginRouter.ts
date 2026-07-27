import Router from "@koa/router";
import { loginController } from "./controllers/loginController";
import { signUpController } from "./controllers/signUpController";
import { validate } from "@/http/middlewares/validation/validator";
import { edge_z } from "@/http/middlewares/validation/schemas";

export function createEdgesRouter() {
  const router = new Router();
  router.post("/", validate(edge_z, "body"), loginController); // TODO: post? or other method?
  router.post(
    "/:source_node_title/:target_node_title",
    validate(edge_z, "params"),
    signUpController,
  ); // TODO: NOT CREATE? 
  // TODO: ALL routers - correcy middleware build
  return router;
}
