import { Context } from "koa";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function SelectBoardController(ctx: Context) {
    const board_id = ctx.state.validated.body.board_id;
    const board = await BoardStateRepository.getBoardState(board_id);

    ctx.session.board_id = board_id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board };
}
