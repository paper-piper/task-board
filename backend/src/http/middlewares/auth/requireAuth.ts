import { UserRepository } from "@/db/repositories/UserRepository";
import { UnauthorizedError } from "@/http/shared/error/http_error";
import { Context, Next } from "koa";

export async function requireAuth(ctx: Context, next: Next) {
    if (
        !ctx.session?.user_id ||
        !(await UserRepository.exists(ctx.session.user_id))
    ) {
        throw new UnauthorizedError("not authenticated");
    }

    await next();
}
