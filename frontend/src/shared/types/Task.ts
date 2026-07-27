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
