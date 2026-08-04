import { Task, TaskStateId } from "@/shared/types";

type TaskRow = {
    id: string;
    code: string;
    title: string;
    cost: string | number;
    value: string | number;
    steps: number;
    predecessors_ids: string[] | null;
    completed: boolean;
    position?: string | number;
};

export const mapTaskRow = (rows: TaskRow[]): Task[] =>
    rows.map((row) => ({
        ...row,
        id: row.id as TaskStateId,
        cost: Number(row.cost),
        value: Number(row.value),
        predecessors_ids: (row.predecessors_ids ?? []) as TaskStateId[],
        position: row.position === undefined ? undefined : Number(row.position),
    }));
