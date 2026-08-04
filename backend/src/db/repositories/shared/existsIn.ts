import { db } from "@/db/buildDb";
import { DB } from "@/db/schema";
import { Executor } from "./executor";

export async function existsIn<
    Table extends keyof DB & string,
    Column extends keyof DB[Table] & string,
>(
    table: Table,
    column: Column,
    value: string,
    executor: Executor = db,
): Promise<boolean> {
    // Table/Column are generic here, so Kysely can't specialize its usual
    // per-table where/select overloads the way a literal table name gets for
    // free — the `any` below is the deliberate escape hatch for that.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = executor.selectFrom(table as any).select(column as any);
    const row = await query.where(column as any, "=", value).executeTakeFirst();

    return row !== undefined;
}
