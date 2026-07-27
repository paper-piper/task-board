import { BadRequestError } from "../../shared/error/http_error";
import { Context, Next } from "koa";
import z from "zod";

type Source = 'body' | 'query' | 'params';

export function validate(schema: z.ZodType, source: Source) {
  return async (ctx: Context, next: Next) => {
    const data = getRequestData(ctx, source);
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new BadRequestError(result.error.message);
    }

    ctx.state.validated = {
      ...ctx.state.validated,
      [source]: result.data,
    };

    await next();
  };
}

function getRequestData<Body>(ctx: Context, source: Source): Body {
  const sources: Record<Source, unknown> = {
    body: ctx.request.body,
    query: ctx.request.query,
    params: ctx.params,
  };
  return sources[source] as Body;
}