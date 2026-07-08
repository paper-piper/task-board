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

export type SelectionStatus = "unselected" | "selected" | "completed";
export const SelectionStatuses = {
  Unselected: "unselected",
  Selected: "selected",
  Completed: "completed",
} as const;

export type ErrorStatus = "no error" | "order error" | "execution error";
export const ErrorStatuses = {
  NoError: "no error",
  OrderError: "order error",
  ExecutionError: "execution error",
};
