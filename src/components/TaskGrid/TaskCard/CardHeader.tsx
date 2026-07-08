import { SelectionStatus } from "@/types";
import { CardSelector } from "./CardSelector";

export function CardHeader({
  code,
  title,
  status,
  onPress,
}: {
  code: string;
  title: string;
  status: SelectionStatus;
  onPress: () => void;
}) {
  return (
    <div className="mb-8 flex items-start">
      <span className="ml-1 mt-1 flex aspect-square w-8 items-center justify-center rounded-md border border-gray-300 font-medium text-teal-800">
        {code}
      </span>
      <span className="ml-2 flex items-center font-medium">{title}</span>
      <CardSelector status={status} onPress={onPress} />
    </div>
  );
}
