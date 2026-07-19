import { SelectionStatus } from "@/types/section";
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
    <div className="mb-8 flex justify-between">
      <div className="flex">
        <span className="flex aspect-square h-8 w-8 items-center justify-center rounded-md border border-gray-300 font-medium text-teal-800">
          {code}
        </span>
        <span className="ml-2 flex items-center font-medium">{title}</span>
      </div>
      <CardSelector status={status} onPress={onPress} />
    </div>
  );
}
