declare const brand: unique symbol;
/** Nominal-typing helper: makes structurally identical ids incompatible with each other. */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type UserId = Brand<string, "UserId">;
export type BoardTemplateId = Brand<string, "BoardTemplateId">;
export type BoardStateId = Brand<string, "BoardStateId">;
export type TaskTemplateId = Brand<string, "TaskTemplateId">;
export type TaskStateId = Brand<string, "TaskStateId">;
export type SessionId = Brand<string, "SessionId">;

export type Email = string;
export type Password = string;

export type User = {
    email: Email;
    password: Password;
};

export type Task = {
    code: string;
    id: TaskStateId;
    title: string;
    cost: number;
    value: number;
    steps: number;
    predecessors_ids: TaskStateId[];
    completed?: boolean;
    position?: number;
};

export type Board = {
    id: BoardStateId;
    tasks: Task[];
    name: string;
    value: number;
    budget: number;
    created_at: Date;
};

export type BoardMetadata = {
    id: BoardTemplateId;
    name: string;
    task_count: number;
    budget: number;
    value: number;
};
