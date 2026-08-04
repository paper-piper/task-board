import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { loginService } from "@/services/auth/loginService";
import { ValidatedContext } from "@/http/shared/context/validatedContext";
import { UserBody } from "@/http/middlewares/content_validation/schemas";

export async function loginController(
    ctx: ValidatedContext<{ body: UserBody }>,
) {
    const { email, password, board_template_id } = ctx.state.validated.body;
    const { board, user_id } = await loginService(
        email,
        password,
        board_template_id,
    );

    ctx.session!.user_id = user_id;
    ctx.session!.board_state_id = board.id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board };
}
