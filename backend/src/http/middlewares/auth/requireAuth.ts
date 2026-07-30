import { UserRepository } from "@/db/repositories/UserRepository";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { UnauthorizedError } from "@/http/shared/error/http_error";
import { Context, Next } from "koa";

export async function requireAuth(ctx: Context, next: Next) {
    if (
        !ctx.session?.user_id ||
        !(await UserRepository.doesExist(ctx.session.user_id))
    ) {
        throw new UnauthorizedError("not authenticated");
    }

    if (
        !ctx.session.board_id ||
        !(await BoardRepository.doesExist(ctx.session.board_id))
    ) {
        throw new UnauthorizedError("not authenticated");
    }

    await next();
}
