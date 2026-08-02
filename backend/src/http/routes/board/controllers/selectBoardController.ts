import { Context } from "koa";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";

export async function SelectBoardController(ctx: Context) {
    const board_template_id = ctx.state.validated.body.board_template_id;
    const user_id = ctx.session.user_id;
    const board_state = await BoardStateRepository.getLatestBoardState(
        board_template_id,
        user_id,
    );

    ctx.session.board_state_id = board_state.id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: board_state };
}
