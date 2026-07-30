import { db } from "@/db/buildDb";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { TaskRepository } from "@/db/repositories/TaskRepository";
import {
    ConflictError,
    NotFoundError,
    UnprocessableEntityError,
} from "@/http/shared/error/http_error";
import { Board, Task } from "@/shared/types";
import { Transaction } from "kysely";
import { DB } from "@/db/schema";

export async function executeTaskService(
    board_id: string,
    task_id: string,
): Promise<Board> {
    const newBoard = await db.transaction().execute(async (trx) => {
        const task = await TaskRepository.getTask(board_id, task_id, trx, true);
        if (!task) {
            throw new NotFoundError("task not found");
        }
        await validateExecution(task, board_id, trx);

        await TaskRepository.markTaskCompleted(task.id, trx);
        await BoardRepository.applyTaskExecution(
            board_id,
            task.cost,
            task.value,
            trx,
        );
        return BoardStateRepository.getBoardState(board_id, trx);
    });
    return newBoard;
}

async function validateExecution(
    task: Task,
    board_id: string,
    trx: Transaction<DB>,
) {
    if (task.completed) {
        throw new UnprocessableEntityError("Task already completed");
    }
    const board = await BoardStateRepository.getBoardState(board_id, trx, true);

    if (board.budget < task.cost) {
        console.log(board.budget);
        console.log(task.cost);
        throw new UnprocessableEntityError("Insufficient budget for task");
    }

    const valid = predecessorsCheck(task, board);
    if (!valid) {
        throw new ConflictError("Predecessor task isn't completed");
    }
}
function predecessorsCheck(task: Task, board: Board): boolean {
    if (!task.predecessors_ids) return true;

    for (const board_task of board.tasks) {
        if (
            task.predecessors_ids.includes(board_task.id) &&
            !board_task.completed
        )
            return false;
    }
    return true;
}
