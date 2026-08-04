import { UserRepository } from "@/db/repositories/UserRepository";
import { UnauthorizedError } from "@/http/shared/error/http_error";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { Context, Next } from "koa";
import { BoardStateId, UserId } from "@/shared/types";

export async function requireAuth(ctx: Context, next: Next) {
    if (
        !ctx.session?.user_id ||
        !(await UserRepository.doesExist(ctx.session.user_id as UserId))
    ) {
        throw new UnauthorizedError("invalid user auth");
    }

    if (
        !ctx.session.board_state_id ||
        !(await BoardStateRepository.doesStateExist(
            ctx.session.board_state_id as BoardStateId,
        ))
    ) {
        throw new UnauthorizedError("invalid state auth");
    }

    await next();
}
