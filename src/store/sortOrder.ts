import { Task } from "@/shared/types/Task";

export function ReorderTask(
  list: Task[],
  taskId: string,
  toIndex: number,
): Task[] {
  const result = [...list];
  const fromIndex = result.findIndex((t) => t.id === taskId);
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved);
  return result;
}
