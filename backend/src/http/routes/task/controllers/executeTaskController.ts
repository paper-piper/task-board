import { Context } from "koa";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { executeTaskService } from "@/services/task/executeTaskService";

export async function executeTaskController(ctx: Context) {
    const task_id = ctx.state.validated.params.task_id;
    const board_id = ctx.session.board_id;

    const newBoard = await executeTaskService(board_id, task_id);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: newBoard };
}
