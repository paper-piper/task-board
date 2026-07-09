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

export function ValidateOrder(
  taskId: string,
  targetIndex: number,
  tasks: Task[],
): boolean {
  const task: Task = tasks.find((t) => t.id === taskId)!;
  const index: number = tasks.indexOf(task);
  if (targetIndex < index)
    return SearchForPredecessors(task, index, targetIndex, tasks);
  else return SearchForSuccessor(task, index, targetIndex, tasks);
}

function SearchForPredecessors(
  task: Task,
  index: number,
  targetIndex: number,
  tasks: Task[],
): boolean {
  if (!task.predecessors_ids) return true;

  for (let i = targetIndex; i < index; i++) {
    const checkedTask = tasks[i];
    if (task.predecessors_ids.includes(checkedTask.id)) return false;
  }
  return true;
}

function SearchForSuccessor(
  task: Task,
  index: number,
  targetIndex: number,
  tasks: Task[],
): boolean {
  for (let i = index + 1; i <= targetIndex; i++) {
    const checkedTask = tasks[i];
    if (checkedTask.predecessors_ids?.includes(task.id)) return false;
  }
  return true;
}
