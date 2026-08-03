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
    // The duplicate is created inside the transaction so a failed validation
    // rolls it back instead of leaving an orphaned board state behind.
    const newBoard = await db.transaction().execute(async (trx) => {
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
        // Positions are 1-based, both in the DB and in what the client sends,
        // so a target position maps to `board.tasks[new_pos - 1]`.
        const new_index = new_pos - 1;

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

// `old_index` and `new_index` are 0-based indices into `board.tasks`,
// which is ordered by position.
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

    // Moving earlier can only jump over predecessors of the task itself;
    // moving later can only jump over tasks that depend on it.
    const moving_earlier = old_index > new_index;

    for (
        let i = Math.min(old_index, new_index);
        i <= Math.max(old_index, new_index);
        i++
    ) {
        const other = board.tasks[i];
        if (other.id === task.id) {
            continue;
        }

        const overrides_predecessor = moving_earlier
            ? task.predecessors_ids.includes(other.id)
            : other.predecessors_ids.includes(task.id);

        if (overrides_predecessor) {
            throw new ConflictError(
                "Invalid new order contains predecessors override",
            );
        }
    }
}
