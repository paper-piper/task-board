import { Context } from "koa";
import { NodeRepository } from "@/db/repositories/NodeRepository";
import { EdgeRepository } from "@/db/repositories/UserRepository";
import { ConflictError } from "@/http/shared/error/http_error";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function signUpController(ctx: Context) {
    const { email, password } = ctx.state.validated.body;
  
    const hashed_password = //TODO: hashing password
    const cookieOrId = await UserRepository.create(email, hashed_password)
  
    if (cookieOrId === null) {
      throw new ConflictError("User with that email already exists");
    }
  
    // TODO: RETURN cookie here, or maybe status should be NO_CONTENT
    ctx.status = HTTP_STATUS.OK;
}
