import setupApp from "./app";
import { env } from "./env/load_env";

const app = setupApp();
app.listen(env.SERVER_PORT, () =>
    console.log("listening on ", env.SERVER_PORT),
);
