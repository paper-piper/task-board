import { Context } from "koa";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function getBoardController(ctx: Context) {
    const board_state_id = ctx.session!.board_state_id;

    const board = await BoardStateRepository.getBoardState(board_state_id);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: board };
}
