import type { Task } from "@/types";

export function getPredecessorsLabel(
  predecessors_ids: string[] | undefined,
  tasks: Task[],
): string | null {
  if (!predecessors_ids || predecessors_ids.length === 0) return null;

  const codes = predecessors_ids
    .map((id) => tasks.find((t) => t.id === id)?.code)
    .filter((code): code is string => Boolean(code));

  if (codes.length === 0) return null;

  return `Predecessor Tasks: ${codes.join()}`;
}
