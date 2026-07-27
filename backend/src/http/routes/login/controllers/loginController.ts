import { Context } from "koa";
import { UserRepository } from "@/db/repositories/UserRepository";
import { NotFoundError } from "@/http/shared/error/http_error";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function loginController(ctx: Context) {
  const { email, password } = ctx.state.validated.body;

  const hashed_password = //TODO: hashing password
  const cookieOrId = await UserRepository.login(email, hashed_password)

  if (cookieOrId === null) {
    throw new NotFoundError("Password or email are inccorect");
  }

  // TODO: RETURN cookie here, or maybe status should be NO_CONTENT
  ctx.status = HTTP_STATUS.OK;
}
