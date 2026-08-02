import { UserRepository } from "@/db/repositories/UserRepository";
import { UnauthorizedError } from "@/http/shared/error/http_error";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { Context, Next } from "koa";

export async function requireAuth(ctx: Context, next: Next) {
    if (
        !ctx.session?.user_id ||
        !(await UserRepository.doesExist(ctx.session.user_id))
    ) {
        throw new UnauthorizedError("invalid user auth");
    }

    if (
        !ctx.session.board_id ||
        !(await BoardStateRepository.doesStateExist(ctx.session.board_id))
    ) {
        throw new UnauthorizedError("invalid state auth");
    }

    await next();
}
