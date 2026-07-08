import type { Task } from "@/types";

export function ValidateExecution(task: Task, budget: number, tasks: Task[]) {
  if (task.cost > budget) return false;

  if (!task.predecessors_ids) return true;

  for (const pre_id of task.predecessors_ids) {
    const pre_task = tasks.find((t) => t.id === pre_id);
    if (!pre_task) continue;

    if (!pre_task.completed) return false;
  }

  return true;
}

export function ValidateOrder(task: Task, tasks: Task[]): boolean {
  return true;
}
