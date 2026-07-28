import { Context } from "koa";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { NotFoundError } from "@/http/shared/error/http_error";

export async function getBoardController(ctx: Context) {
  const user_id = ctx.session.user_id;

  const board = await BoardRepository.getBoard(user_id);

  if (!board) {
    throw new NotFoundError("board not found");
  }
  ctx.status = HTTP_STATUS.OK;
  ctx.body = { board: board };
}
