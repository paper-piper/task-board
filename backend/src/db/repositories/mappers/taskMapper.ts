import { Task } from "@/shared/types";

type TaskRow = {
    id: string;
    code: string;
    title: string;
    cost: string | number;
    value: string | number;
    steps: number;
    predecessors_ids: string[] | null;
    completed: boolean;
};

export const mapTaskRow = (rows: TaskRow[]): Task[] =>
    rows.map((row) => ({
        ...row,
        cost: Number(row.cost),
        value: Number(row.value),
        predecessors_ids: row.predecessors_ids ?? [],
    }));
