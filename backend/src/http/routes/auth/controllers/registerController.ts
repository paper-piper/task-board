import { Context } from "koa";
import bcrypt from "bcrypt";
import { UserRepository } from "@/db/repositories/UserRepository";
import { ConflictError } from "@/http/shared/error/http_error";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

const SALT_ROUNDS = 12;

export async function registerController(ctx: Context) {
  const { email, password } = ctx.state.validated.body;

  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
  const { user_id } = await UserRepository.create(email, hashed_password);

  if (user_id === null) {
    throw new ConflictError("User with that email already exists");
  }

  ctx.session.user_id = user_id;
  ctx.status = HTTP_STATUS.OK;
}
