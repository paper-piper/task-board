import {
  type ReactNode,
  type ReactElement,
  type SVGProps,
  useRef,
  useEffect,
} from "react";
import { Task } from "@/types/Task";
import { DiamondIcon } from "../../ui/Icons";
import { useDraggable } from "@dnd-kit/core";
import { CardHeader } from "./CardHeader";
import { MapStatus } from "./map_status";

function Content({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
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
export function TaskCard({
  task,
  predecessorsLabel,
  isSelected,
  onPress,
}: {
  task: Task;
  predecessorsLabel: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  const status = MapStatus(task.completed || false, isSelected);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px) rotate(${isDragging ? 5 : 0}deg)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`aspect-[5/3] max-w-96 rounded-lg border border-gray-300 bg-white pb-5 shadow-[0_0_7px_rgba(10,10,10,0.3)] ${
        isDragging ? "relative z-50" : "transition-transform"
      }`}
    >
      <CardHeader
        code={task.code}
        title={task.title}
        status={status}
        onPress={onPress}
      />
      <CardSection>
        <Content title="Cost" value={`$${task.cost}`} />
      </CardSection>
      <CardSection>
        <Content title="Value" value={task.value} icon={<DiamondIcon />} />
        <Content title="Steps" value={task.steps} />
      </CardSection>
      <div className="ml-5 font-light">{predecessorsLabel}</div>
    </div>
  );
}
