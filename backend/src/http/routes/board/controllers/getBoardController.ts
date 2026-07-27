import { Context } from "koa";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function getBoardController(ctx: Context) {
  // TODO fetch cookie somehow,
  const board = await BoardRepository.getBoard(user_id);

  ctx.status = HTTP_STATUS.OK;
  ctx.body = { board: board };
}
