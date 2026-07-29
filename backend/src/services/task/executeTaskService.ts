import { db } from "@/db/buildDb";
import { BoardRepository } from "@/db/repositories/BoardRepository";
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
    user_id: string,
    task_id: string,
): Promise<Board | null> {
    const newBoard = await db.transaction().execute(async (trx) => {
        const task = await TaskRepository.getUserTask(
            user_id,
            task_id,
            trx,
            true,
        );
        await validateExecution(task, user_id, trx);

        if (!task) return null; // never happens, purley for ts compiling

        await TaskRepository.markTaskCompleted(task.id, trx);
        await BoardRepository.applyTaskExecution(
            user_id,
            task.cost,
            task.value,
            trx,
        );
        return BoardRepository.getBoard(user_id, trx);
    });
    return newBoard;
}

async function validateExecution(
    task: Task | null,
    user_id: string,
    trx: Transaction<DB>,
) {
    if (!task) {
        throw new NotFoundError("task not found");
    }
    if (task.completed) {
        throw new UnprocessableEntityError("Task already completed");
    }
    const board = await BoardRepository.getBoard(user_id, trx, true);

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
