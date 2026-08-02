import { db } from "@/db/buildDb";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { TaskRepository } from "@/db/repositories/TaskRepository";
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from "@/http/shared/error/http_error";
import { Board, Task } from "@/shared/types";

export async function reorderTaskService(
    board_state_id: string,
    task_id: string,
    new_pos: number,
): Promise<Board> {
    const new_board_state_id =
        await BoardStateRepository.duplicateBoardState(board_state_id);
    const newBoard = await db.transaction().execute(async (trx) => {
        const board = await BoardStateRepository.getBoardState(
            new_board_state_id,
            trx,
        );
        const task = await TaskRepository.getTask(
            new_board_state_id,
            task_id,
            trx,
        );
        if (!task) {
            throw new NotFoundError("task not found");
        }
        const old_pos = board.tasks.findIndex((t) => t.id === task.id);

        validateReorder(board, task, old_pos, new_pos);

        await BoardStateRepository.reorderTask(
            new_board_state_id,
            task_id,
            old_pos,
            new_pos,
            trx,
        );

        return await BoardStateRepository.getBoardState(
            new_board_state_id,
            trx,
        );
    });
    return newBoard;
}

function validateReorder(
    board: Board,
    task: Task,
    old_pos: number,
    new_pos: number,
): number {
    if (old_pos === new_pos) {
        throw new BadRequestError(
            "task has the same position as target position",
        );
    }
    // TODO: DELETE?
    // if new pos is bigger: needs to make sure its not a pre of other cards
    // if now pos is smaller: needs to make sure other cards aren't pre of this card
    for (
        let i = Math.min(old_pos, new_pos);
        i <= Math.max(old_pos, new_pos);
        i++
    ) {
        if (old_pos > new_pos) {
            if (task.predecessors_ids.includes(board.tasks[i].id)) {
                throw new ConflictError(
                    "Invalid new order contains predecessors override",
                );
            }
        } else {
            if (board.tasks[i].predecessors_ids.includes(task.id)) {
                throw new ConflictError(
                    "Invalid new order contains predecessors override",
                );
            }
        }
    }
    return old_pos;
}
