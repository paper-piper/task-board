import { db } from "@/db/buildDb";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { TaskRepository } from "@/db/repositories/TaskRepository";
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from "@/http/shared/error/http_error";
import { Board, BoardStateId, Task, TaskStateId } from "@/shared/types";

export async function reorderTaskService(
    board_state_id: BoardStateId,
    task_id: TaskStateId,
    new_pos: number,
): Promise<Board> {
    const newBoard = await db.transaction().execute(async (trx) => {
        // bonus: protect against duplicating board at the same time
        const new_board_state_id =
            await BoardStateRepository.duplicateBoardState(board_state_id, trx);

        const board = await BoardStateRepository.getBoardState(
            new_board_state_id,
            trx,
        );
        const task = await TaskRepository.getTaskFromPrevState(
            new_board_state_id,
            task_id,
            trx,
        );
        if (!task) {
            throw new NotFoundError("task not found");
        }

        const old_index = board.tasks.findIndex((t) => t.id === task.id);
        if (old_index === -1) {
            throw new NotFoundError("task not found on board");
        }

        const new_index = new_pos;

        validateReorder(board, task, old_index, new_index);

        await BoardStateRepository.reorderTask(
            new_board_state_id,
            task.id,
            task.position!,
            board.tasks[new_index].position!,
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
    old_index: number,
    new_index: number,
): void {
    if (new_index < 0 || new_index >= board.tasks.length) {
        throw new BadRequestError("target position is out of range");
    }
    if (old_index === new_index) {
        throw new BadRequestError(
            "task has the same position as target position",
        );
    }

    const going_backwards = new_index < old_index;

    for (
        let i = Math.min(old_index, new_index);
        i <= Math.max(old_index, new_index);
        i++
    ) {
        const other = board.tasks[i];
        if (other.id === task.id) {
            continue;
        }

        const overrides_predecessor = going_backwards
            ? task.predecessors_ids.includes(other.id)
            : other.predecessors_ids.includes(task.id);

        if (overrides_predecessor) {
            throw new ConflictError(
                "Invalid new order contains predecessors override",
            );
        }
    }
}
