import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./schema";
import { env } from "../env/load_env";

export let db: Kysely<DB>;

export function buildDb() {
    db = new Kysely<DB>({
        dialect: new PostgresDialect({
            pool: new Pool({
                host: env.DB_HOST,
                port: env.DB_PORT,
                database: env.POSTGRES_DB,
                user: env.POSTGRES_USER,
                password: env.POSTGRES_PASSWORD,
            }),
        }),
    });
}
