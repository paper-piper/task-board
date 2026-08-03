import { DragEndEvent } from "@dnd-kit/core";
import { useBoardStore } from "@/boardStore";
import { ValidateOrder } from "@/shared/validation/order";
import { ErrorStatuses } from "@/shared/types/error";
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

    const currentPos = 1 + tasks.findIndex((t) => t.id === taskId);
    if (currentPos === newPos) return;

    if (!ValidateOrder(taskId, newPos, tasks)) {
        useBoardStore.getState().setError(ErrorStatuses.OrderError); // still fine — Zustand, not a hook
        return;
    }

    reorderTask({ taskId, position: newPos });
}
