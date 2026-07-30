import { Context } from "koa";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function getBoardController(ctx: Context) {
    const board_id = ctx.session!.board_id;

    const board = await BoardRepository.getBoard(board_id);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: board };
}
