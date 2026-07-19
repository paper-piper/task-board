export type SelectionStatus = "unselected" | "selected" | "completed";
export const SelectionStatuses = {
  Unselected: "unselected",
  Selected: "selected",
  Completed: "completed",
} as const;
