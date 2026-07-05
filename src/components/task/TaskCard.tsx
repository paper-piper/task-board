import type { ReactNode } from "react";
import { Task } from "@/types";
import { DiamondIcon } from "../ui/DiamondIcon";
import { CardSelector } from "./TaskCardSelector";

function Content({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="mx-5 flex flex-col">
      <span className="text-sm font-light text-gray-500">{title}</span>
      <span className="flex text-lg font-medium">
        {value}
        {icon}
      </span>
    </div>
  );
}

function CardSection({ children }: { children: ReactNode }) {
  return <div className="flex border-t border-t-gray-400 py-1">{children}</div>;
}

function CardHeader({
  code,
  title,
  isSelected,
  onPress,
}: {
  code: string;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <div className="mb-8 flex items-start">
      <span className="ml-1 mt-1 flex aspect-square w-8 items-center justify-center rounded-md border border-gray-300 font-medium text-teal-800">
        {code}
      </span>
      <span className="ml-2 flex items-center font-medium">{title}</span>
      <CardSelector isSelected={isSelected} onPress={onPress} />
    </div>
  );
}

export function TaskCard({
  task,
  isSelected,
  onPress,
}: {
  task: Task;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <div className="aspect-[5/3] max-w-96 rounded-lg border border-gray-300 pb-5 shadow-[0_0_7px_rgba(10,10,10,0.3)]">
      <CardHeader
        code={task.code}
        title={task.title}
        isSelected={isSelected}
        onPress={onPress}
      />
      <CardSection>
        <Content title="Cost" value={`$${task.cost}`} />
      </CardSection>
      <CardSection>
        <Content title="Value" value={task.value} icon={<DiamondIcon />} />
        <Content title="Steps" value={task.steps} />
      </CardSection>
    </div>
  );
}
