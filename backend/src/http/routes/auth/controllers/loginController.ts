import { Context } from "koa";
import { UserRepository } from "@/db/repositories/UserRepository";
import { NotFoundError } from "@/http/shared/error/http_error";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import bcrypt from "bcrypt";

export async function loginController(ctx: Context) {
    const { email, password, board_id } = ctx.state.validated.body;

    const user = await UserRepository.getUser(email);

    if (user === null) {
        throw new NotFoundError("User doesn't exist");
    }
    if (!(await bcrypt.compare(password, user.hashed_password))) {
        throw new NotFoundError("Incorrect password");
    }

    ctx.session!.user_id = user.user_id;
    ctx.status = HTTP_STATUS.OK;
}
