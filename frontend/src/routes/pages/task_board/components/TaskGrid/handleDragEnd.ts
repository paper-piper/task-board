import { DragEndEvent } from "@dnd-kit/core";
import { useBoardStore } from "@/board_store/boardStore";
import { ErrorStatuses } from "@/shared/error/types";
import { Task } from "@/shared/types/Task";

export function handleDragEnd(
    event: DragEndEvent,
    tasks: Task[],
    reorderTask: (args: { taskId: string; position: number }) => void,
) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newPos = over.id as number;

    const currentPos = tasks.findIndex((t) => t.id === taskId);
    if (currentPos === newPos) return;

    reorderTask({ taskId, position: newPos });
}
