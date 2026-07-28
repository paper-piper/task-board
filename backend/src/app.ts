import Koa from "koa";
import Router from "@koa/router";
import { createBoardRouter } from "./http/routes/board/boardRouter";
import { createAuthRouter } from "./http/routes/login/authRouter";
import { loadEnv } from "./env/load_env";
import { buildDb } from "./db/buildDb";
import { handleErrors } from "./http/middlewares/error/errorHandler";
import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";

export default function setupApp() {
  loadEnv();
  buildDb();

  const app = new Koa();
  app.keys = [process.env.SESSION_SECRET!];
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );
  const root_router = new Router();

  app.use(bodyParser());
  app.use(handleErrors);
  // TODO: add session middleware here

  root_router.use("/board", createBoardRouter().routes());
  root_router.use("/auth", createAuthRouter().routes());

  app.use(root_router.routes());
  app.use(root_router.allowedMethods());
  return app;
}
