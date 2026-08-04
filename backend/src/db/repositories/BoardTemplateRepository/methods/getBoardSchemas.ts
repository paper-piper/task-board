import { db } from "@/db/buildDb";
import { TABLE_NAMES } from "@/db/tableNames";
import { BoardMetadata, BoardTemplateId } from "@/shared/types";
import { Executor } from "@/db/repositories/shared/executor";

export async function getBoardSchemas(
    executor: Executor = db,
): Promise<BoardMetadata[]> {
    const boards = await executor
        .selectFrom(TABLE_NAMES.board_templates)
        .select(["board_template_id as id", "name", "budget", "value"])
        .execute();

    const board_ids = boards.map((b) => b.id as BoardTemplateId);
    const task_counts = await executor
        .selectFrom(TABLE_NAMES.task_templates)
        .where("board_template_id", "in", board_ids)
        .select([
            "board_template_id",
            (eb) => eb.fn.count("board_template_id").as("task_count"),
        ])
        .groupBy("board_template_id")
        .execute();

    return boards.map((b): BoardMetadata => ({
        ...b,
        id: b.id as BoardTemplateId,
        budget: Number(b.budget),
        value: Number(b.value),
        task_count: Number(
            task_counts.find((t) => t.board_template_id === b.id)?.task_count ??
                0,
        ),
    }));
}
