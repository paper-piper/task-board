import { Context } from "koa";
import { UserRepository } from "@/db/repositories/UserRepository";
import { NotFoundError } from "@/http/shared/error/http_error";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import bcrypt from "bcrypt";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { loginService } from "@/services/auth/loginService";

export async function loginController(ctx: Context) {
    const {
        email,
        password,
        board_id: board_template_id,
    } = ctx.state.validated.body;
    const board = await loginService(email, password, board_template_id);
    const user = await UserRepository.getUser(email);

    if (user === null) {
        throw new NotFoundError("User doesn't exist");
    }
    if (!(await bcrypt.compare(password, user.hashed_password))) {
        throw new NotFoundError("Incorrect password");
    }
    const board = await BoardStateRepository.getLatestBoardState(
        board_template_id,
        user.user_id,
    );

    ctx.session.user_id = user.user_id;
    ctx.session.board_id = board_template_id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board };
}
