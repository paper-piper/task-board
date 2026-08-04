import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { Executor } from "@/db/repositories/shared/executor";
import {
    Board,
    BoardStateId,
    BoardTemplateId,
    TaskStateId,
    TaskTemplateId,
    UserId,
} from "@/shared/types";
import { getBoardState } from "@/db/repositories/BoardStateRepository/methods/getBoardState";

async function getTemplateBoard(
    board_template_id: BoardTemplateId,
    executor: Executor,
) {
    return executor
        .selectFrom(TABLE_NAMES.board_templates)
        .where("board_template_id", "=", board_template_id)
        .select(["name", "budget", "value", "board_template_id"])
        .executeTakeFirstOrThrow();
}

async function insertBoardState(
    template_board: Awaited<ReturnType<typeof getTemplateBoard>>,
    board_state_id: BoardStateId,
    user_id: UserId,
    executor: Executor,
) {
    await executor
        .insertInto(TABLE_NAMES.board_states)
        .values({
            board_state_id,
            board_template_id: template_board.board_template_id,
            user_id,
            name: template_board.name,
            budget: template_board.budget,
            value: template_board.value,
        })
        .execute();
}

async function getTemplateTasks(
    board_template_id: BoardTemplateId,
    executor: Executor,
) {
    return executor
        .selectFrom(TABLE_NAMES.task_templates)
        .where("board_template_id", "=", board_template_id)
        .select([
            "task_template_id",
            "code",
            "title",
            "cost",
            "value",
            "steps",
            "predecessors_ids",
            "completed",
            "position",
        ])
        .execute();
}

async function insertTaskStates(
    template_tasks: Awaited<ReturnType<typeof getTemplateTasks>>,
    board_state_id: BoardStateId,
    executor: Executor,
) {
    const new_tasks = await executor
        .insertInto(TABLE_NAMES.task_states)
        .values(
            template_tasks.map(({ predecessors_ids, ...task }) => ({
                ...task,
                board_state_id,
                predecessors_ids: null,
            })),
        )
        .returning(["task_state_id", "task_template_id"])
        .execute();

    return new Map<TaskTemplateId, TaskStateId>(
        new_tasks.map((task) => [
            task.task_template_id as TaskTemplateId,
            task.task_state_id as TaskStateId,
        ]),
    );
}

async function linkTaskPredecessors(
    template_tasks: Awaited<ReturnType<typeof getTemplateTasks>>,
    templateIdToNewTaskId: Map<TaskTemplateId, TaskStateId>,
    executor: Executor,
) {
    for (const task of template_tasks) {
        if (!task.predecessors_ids || task.predecessors_ids.length === 0) {
            continue;
        }

        const new_predecessors_ids = task.predecessors_ids
            .map((template_id) =>
                templateIdToNewTaskId.get(template_id as TaskTemplateId),
            )
            .filter((id): id is TaskStateId => id !== undefined);

        await executor
            .updateTable(TABLE_NAMES.task_states)
            .set({ predecessors_ids: new_predecessors_ids })
            .where(
                "task_state_id",
                "=",
                templateIdToNewTaskId.get(
                    task.task_template_id as TaskTemplateId,
                )!,
            )
            .execute();
    }
}

export async function createBoardFromTemplate(
    board_template_id: BoardTemplateId,
    user_id: UserId,
    executor: Executor = db,
): Promise<Board> {
    const template_board = await getTemplateBoard(board_template_id, executor);

    const board_state_id = crypto.randomUUID() as BoardStateId;
    await insertBoardState(template_board, board_state_id, user_id, executor);

    const template_tasks = await getTemplateTasks(board_template_id, executor);

    if (template_tasks.length > 0) {
        const templateIdToNewTaskId = await insertTaskStates(
            template_tasks,
            board_state_id,
            executor,
        );
        await linkTaskPredecessors(
            template_tasks,
            templateIdToNewTaskId,
            executor,
        );
    }

    return getBoardState(board_state_id, executor);
}
