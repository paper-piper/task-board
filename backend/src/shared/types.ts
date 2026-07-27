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
  predecessors_ids?: string[];
  completed?: boolean;
};

export type Board = {
  tasks: Task[];
  value: number;
  cost: number;
};
