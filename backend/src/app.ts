import Koa from "koa";
import Router from "@koa/router";
import { createNodesRouter } from "./http/routes/board/boardRouter";
import { createEdgesRouter } from "./http/routes/login/loginRouter";
import { createQueriesRouter } from "./http/routes/queries/queriesRouter";
import { loadEnv } from "./env/load_env";
import { buildDb } from "./db/buildDb";
import { handleErrors } from "./http/middlewares/error/errorHandler";
import bodyParser from "@koa/bodyparser";

export default function setupApp() {
  loadEnv();
  buildDb();

  const app = new Koa();
  const root_router = new Router();
  // TODO: ADD the new and extra middlewares
  app.use(bodyParser());
  app.use(handleErrors);

  root_router.use("/nodes", createNodesRouter().routes());
  root_router.use("/edges", createEdgesRouter().routes());
  root_router.use("/queries", createQueriesRouter().routes());

  app.use(root_router.routes());
  app.use(root_router.allowedMethods());
  return app;
}
