import { Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { useBoardStore } from "@/store/boardStore";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { useTaskDragAndDrop } from "@/hooks/useTaskDragAndDrop";
import { useIsTaskSelected } from "@/hooks/useBoard";
import { getPredecessorsLabel } from "@/lib/predecessors";

export function TaskGrid() {
  const tasks = useBoardStore((state) => state.tasks);
  const { handleDragEnd } = useTaskDragAndDrop();
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ul className="grid grid-cols-1 gap-px border border-gray-300 bg-gray-300 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map((task, index) => (
          <CardCell
            key={task.id}
            task={task}
            index={index + 1}
            predecessorsLabel={
              getPredecessorsLabel(task.predecessors_ids, tasks) || ""
            }
          />
        ))}
      </ul>
    </DndContext>
  );
}

function CardCell({
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
      className={`group relative p-5 transition-colors ${
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
      <div className="pb-6 pt-5">
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
