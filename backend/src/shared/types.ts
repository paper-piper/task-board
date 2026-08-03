export type Email = string;
export type Password = string;

export type User = {
    email: Email;
    password: Password;
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
    position?: number;
};
// bonus: entity vs domain
export type Board = {
    id: string;
    tasks: Task[];
    name: string;
    value: number;
    budget: number;
    created_at: Date;
};

export type BoardMetadata = {
    id: string;
    name: string;
    task_count: number;
    budget: number;
    value: number;
};
