import { SelectionStatus } from "@/shared/types/section";
import { CardSelector } from "./CardSelector";
import { Link } from "react-router-dom";

export function CardHeader({
  id,
  code,
  title,
  status,
  onPress,
}: {
  id: string;
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
        <Link className="ml-2 flex items-center font-medium" key={id} to={"/"}>
          {title}
        </Link>
      </div>
      <CardSelector status={status} onPress={onPress} />
    </div>
  );
}
