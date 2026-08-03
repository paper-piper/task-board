import { registerService } from "@/services/auth/registerService";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { ValidatedContext } from "@/http/shared/context/validatedContext";
import { UserBody } from "@/http/middlewares/content_validation/schemas";

export async function registerController(
    ctx: ValidatedContext<{ body: UserBody }>,
) {
    const { email, password, board_template_id } = ctx.state.validated.body;

    const { user_id, board } = await registerService(
        email,
        password,
        board_template_id,
    );

    ctx.session!.user_id = user_id;
    ctx.session!.board_id = board.id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: board };
}
