import { Context } from "koa";
import { registerService } from "@/services/auth/registerService";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function registerController(ctx: Context) {
    const { email, password } = ctx.state.validated.body;

    const { user_id, board } = await registerService(email, password);

    ctx.session!.user_id = user_id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: board };
}
