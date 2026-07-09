import { DragEndEvent } from "@dnd-kit/core";
import { useBoardStore } from "@/store/boardStore";
import { ValidateOrder } from "@/lib/validation";

export function useTaskDragAndDrop() {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newPos = over.id as number;
    const tasks = useBoardStore.getState().tasks;

    if (!ValidateOrder(active.id as string, newPos, tasks)) {
      useBoardStore.getState().raiseOrderError();
      return;
    }

    useBoardStore.getState().reorderTasks(taskId, newPos);
  }

  return { handleDragEnd };
}
