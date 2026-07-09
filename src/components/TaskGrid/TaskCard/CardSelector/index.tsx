import { SelectionStatuses, type SelectionStatus } from "@/types/section";
import { CompletedButton } from "./CompletedButton";

export function CardSelector({
  status,
  onPress,
}: {
  status: SelectionStatus;
  onPress: () => void;
}) {
  if (status === SelectionStatuses.Completed) {
    return <CompletedButton />;
  }

  return (
    <button
      onClick={onPress}
      onPointerDown={(e) => e.stopPropagation()}
      className="ml-auto pr-2 pt-2"
    >
      {status === SelectionStatuses.Selected ? (
        <SelectedButton />
      ) : (
        <UnselectedButton />
      )}
    </button>
  );
}

function UnselectedButton() {
  return <span className="block h-5 w-5 rounded-full border border-gray-800" />;
}

function SelectedButton() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-800">
      <span className="block h-3.5 w-3.5 rounded-full bg-gray-800" />
    </span>
  );
}
