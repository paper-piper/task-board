import Koa from "koa";
import Router from "@koa/router";
import { createBoardRouter } from "./http/routes/board/boardRouter";
import { createAuthRouter } from "./http/routes/auth/authRouter";
import { env, loadEnv } from "./env/load_env";
import { buildDb } from "./db/buildDb";
import { errorHandler } from "./http/middlewares/error/errorHandler";
import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";
import session from "koa-session";
import { PgSessionStore } from "./http/middlewares/session/PgSessionStore";
import { createTaskRouter } from "./http/routes/task/taskRouter";

export default function setupApp() {
    loadEnv();
    buildDb();

    const app = new Koa();
    app.keys = [env.SESSION_SECRET];
    app.use(
        cors({
            origin: env.CLIENT_ORIGIN,
            credentials: true,
        }),
    );
    app.use(
        session(
            {
                key: "sid",
                maxAge: 24 * 60 * 60 * 1000, // 24h
                httpOnly: true,
                secure: false,
                store: new PgSessionStore(),
            },
            app,
        ),
    );

    app.use(bodyParser());
    app.use(errorHandler);

    const root_router = new Router();
    root_router.use("/board", createBoardRouter().routes());
    root_router.use("/auth", createAuthRouter().routes());
    root_router.use("/task", createTaskRouter().routes());

    app.use(root_router.routes());
    app.use(root_router.allowedMethods());
    return app;
}