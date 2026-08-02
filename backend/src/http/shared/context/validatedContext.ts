import { ParameterizedContext } from "koa";

export type ValidatedContext<V extends Partial<Validated>> =
    ParameterizedContext<{
        validated: V;
    }>;

interface Validated<Body = unknown, Params = unknown, Query = unknown> {
    body: Body;
    params: Params;
    query: Query;
}
