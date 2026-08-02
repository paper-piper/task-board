import { Context } from "koa";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { loginService } from "@/services/auth/loginService";

export async function loginController(ctx: Context) {
    const {
        email,
        password,
        board_id: board_template_id,
    } = ctx.state.validated.body;
    const { board, user_id } = await loginService(
        email,
        password,
        board_template_id,
    );

    ctx.session.user_id = user_id;
    ctx.session.board_id = board_template_id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board };
}
