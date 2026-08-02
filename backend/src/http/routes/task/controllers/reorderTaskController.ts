import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { reorderTaskService } from "@/services/task/reorderTaskService";
import { ValidatedContext } from "@/http/middlewares/content_validation/validatedContext";
import {
    TaskId,
    Position,
} from "@/http/middlewares/content_validation/schemas";

export async function reorderTaskController(
    ctx: ValidatedContext<{ params: TaskId; body: Position }>,
) {
    const board_id = ctx.session.board_id;
    const task_id = ctx.state.validated.params.task_id;
    const new_pos = ctx.state.validated.body.position;

    const newBoard = await reorderTaskService(board_id, task_id, new_pos);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { board: newBoard };
}
