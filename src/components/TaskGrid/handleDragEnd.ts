import { DragEndEvent } from "@dnd-kit/core";
import { useBoardStore } from "@/store/boardStore";
import { ValidateOrder } from "@/shared/validation/order";
import { ErrorStatuses } from "@/shared/types/error";
export function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (!over) return;

  const taskId = active.id as string;
  const newPos = over.id as number;
  const tasks = useBoardStore.getState().tasks;

  if (!ValidateOrder(taskId, newPos, tasks)) {
    useBoardStore.getState().setError(ErrorStatuses.OrderError);
    return;
  }

  useBoardStore.getState().reorderTasks(taskId, newPos);
}
