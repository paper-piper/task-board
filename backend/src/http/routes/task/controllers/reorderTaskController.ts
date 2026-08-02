import { Context } from "koa";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { reorderTaskService } from "@/services/task/reorderTaskService";

export async function reorderTaskController(ctx: Context) {
    const board_id = ctx.session.board_id;
    const task_id = ctx.state.validated.params.task_id;
    const new_pos = ctx.state.validated.body.new_pos;

    const newBoard = await reorderTaskService(board_id, task_id, new_pos);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: newBoard };
}
