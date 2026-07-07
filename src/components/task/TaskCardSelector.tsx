import { completedIcon } from "../ui/Icons";
import { SelectionStatus, SelectionStatuses } from "@/types";

export function CardSelector({
  status,
  onPress,
}: {
  status: SelectionStatus;
  onPress: () => void;
}) {
  return (
    <button onClick={onPress} className="ml-auto pr-2 pt-2">
      {status === SelectionStatuses.Completed ? (
        <CompletedIcon />
      ) : status === SelectionStatuses.Selected ? (
        <SelectedIcon />
      ) : (
        <UnselectedIcon />
      )}
    </button>
  );
}

function UnselectedIcon() {
  return <span className="block h-5 w-5 rounded-full border border-gray-800" />;
}

function SelectedIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-800">
      <span className="block h-3.5 w-3.5 rounded-full bg-gray-800" />
    </span>
  );
}

function CompletedIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full">
      {completedIcon()}
    </span>
  );
}
