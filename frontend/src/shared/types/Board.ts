import { Task } from "./Task";

export type Board = {
    id: string;
    tasks: Task[];
    name: string;
    value: number;
    budget: number;
    created_at: string;
};

export type BoardMetadata = {
    id: string;
    name: string;
    task_count: number;
    budget: number;
    value: number;
};
