import { Task } from "@/types/Task";
import { TaskCard } from "./TaskCard";
import { useBoardStore, useIsTaskSelected } from "@/store/boardStore";
import { useDroppable } from "@dnd-kit/core";

export function CardCell({
  task,
  predecessorsLabel,
  index,
}: {
  task: Task;
  predecessorsLabel: string;
  index: number;
}) {
  const isSelected = useIsTaskSelected(task.id);
  const setSelectedTaskId = useBoardStore((state) => state.setSelectedTaskId);
  const { setNodeRef, isOver } = useDroppable({
    id: index - 1,
  });
  return (
    <li
      ref={setNodeRef}
      className={`group relative flex flex-col p-5 transition-colors ${
        isOver ? "bg-[#E0F7F7]" : "bg-white"
      }`}
    >
      <div
        className={`pointer-events-none absolute -inset-px border transition-colors ${
          isOver ? "border-teal-500" : "border-transparent"
        }`}
      />
      {task.completed && (
        <div className="pointer-events-none absolute inset-0 bg-white/70" />
      )}
      <span className="font-medium text-gray-400">
        {index < 10 ? `0${index}` : index}
      </span>
      <div className="self-center pb-6 pt-5">
        <TaskCard
          task={task}
          predecessorsLabel={predecessorsLabel}
          isSelected={isSelected}
          onPress={() => setSelectedTaskId(task.id)}
        />
      </div>
    </li>
  );
}
