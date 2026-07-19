import { CardContent } from "./CardContent";
import { Task } from "@/types/Task";
import { useDraggable } from "@dnd-kit/core";
import { CardHeader } from "./CardHeader";
import { MapStatus } from "./map_status";

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
      className={`h-[225px] w-[346.50px] rounded-lg border border-gray-300 bg-white p-2 shadow-[0_0_7px_rgba(10,10,10,0.3)] ${
        isDragging ? "relative z-50" : "transition-transform"
      }`}
    >
      <CardHeader
        code={task.code}
        title={task.title}
        status={status}
        onPress={onPress}
      />
      <CardContent task={task} predecessorsLabel={predecessorsLabel} />
    </div>
  );
}
