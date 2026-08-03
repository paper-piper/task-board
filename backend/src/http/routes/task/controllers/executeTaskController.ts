import { Context } from "koa";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { executeTaskService } from "@/services/task/executeTaskService";
import { ValidatedContext } from "@/http/shared/context/validatedContext";
import { TaskId } from "@/http/middlewares/content_validation/schemas";

export async function executeTaskController(
    ctx: ValidatedContext<{ params: TaskId }>,
) {
    const task_id = ctx.state.validated.params.task_id;
    const board_id = ctx.session!.board_id;

    const newBoard = await executeTaskService(board_id, task_id);

    ctx.session!.board_id = newBoard.id;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: newBoard };
}
