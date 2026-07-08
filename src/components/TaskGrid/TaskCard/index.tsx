import {
  type ReactNode,
  type ReactElement,
  type SVGProps,
  useRef,
  useEffect,
} from "react";
import { Task, SelectionStatus, SelectionStatuses } from "@/types";
import { DiamondIcon } from "../../ui/Icons";
import { CardSelector } from "./CardSelector";
import { useDraggable } from "@dnd-kit/core";
import { CardHeader } from "./CardHeader";

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

function MapStatus(isCompleted: boolean, isSelected: boolean): SelectionStatus {
  if (isCompleted) {
    return SelectionStatuses.Completed;
  }
  if (isSelected) {
    return SelectionStatuses.Selected;
  }
  return SelectionStatuses.Unselected;
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

  const prevCompleted = useRef(task.completed);
  useEffect(() => {
    if (task.completed && !prevCompleted.current) {
      // play the transition — set local animating state, or let CSS handle it
    }
    prevCompleted.current = task.completed;
  }, [task.completed]);

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
