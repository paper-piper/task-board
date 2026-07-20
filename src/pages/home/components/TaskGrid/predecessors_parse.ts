import type { Task } from "@/shared/types/Task";

export function getPredecessorsLabel(
  predecessors_ids: string[] | undefined,
  tasks: Task[],
): string | null {
  if (!predecessors_ids || predecessors_ids.length === 0) return null;

  const codes = predecessors_ids
    .map((id) => tasks.find((t) => t.id === id)?.code)
    .filter((code): code is string => Boolean(code));

  if (codes.length === 0) return null;

  if (codes.length === 1) return `Predecessor Task: ${codes}`;
  return `Predecessor Tasks: ${codes.join(", ")}`;
}
