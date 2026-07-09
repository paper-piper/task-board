import type { Task } from "@/types/Task";

export function ValidateExecution(task: Task, tasks: Task[]) {
  if (!task.predecessors_ids) return true;

  for (const pre_id of task.predecessors_ids) {
    const pre_task = tasks.find((t) => t.id === pre_id);
    if (!pre_task) continue;

    if (!pre_task.completed) return false;
  }

  return true;
}
