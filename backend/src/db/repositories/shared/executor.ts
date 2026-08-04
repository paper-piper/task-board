import { Kysely, Transaction } from "kysely";
import { DB } from "@/db/schema";

export type Executor = Kysely<DB> | Transaction<DB>;
