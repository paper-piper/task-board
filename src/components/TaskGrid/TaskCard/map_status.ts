import { SelectionStatus, SelectionStatuses } from "@/types/section";

export function MapStatus(
  isCompleted: boolean,
  isSelected: boolean,
): SelectionStatus {
  if (isCompleted) {
    return SelectionStatuses.Completed;
  }
  if (isSelected) {
    return SelectionStatuses.Selected;
  }
  return SelectionStatuses.Unselected;
}
