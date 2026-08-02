export type User = {
    email: string;
    password: string;
};

export type Task = {
    code: string;
    id: string;
    title: string;
    cost: number;
    value: number;
    steps: number;
    predecessors_ids: string[];
    completed?: boolean;
};

export type Board = {
    id: string; // TODO intigrate + entity domain
    tasks: Task[];
    name: string;
    value: number;
    budget: number;
    created_at: Date; // TODO Right format? + migration
};

export type BoardMetadata = {
    id: string; // TODO: entity verses domain
    name: string;
    task_count: number;
    budget: number;
    value: number;
};
// TODO: Last opened board
