import { Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { useBoardStore } from "@/store/UseBoardStore";

export function TaskGrid() {
  const tasks = useBoardStore((state) => state.tasks);
  return (
    <ul className="grid grid-cols-1 border-l border-t border-gray-300 bg-white sm:grid-cols-2 lg:grid-cols-4">
      {tasks.map((task, index) => (
        <CardCell key={task.id} task={task} index={index + 1} />
      ))}
    </ul>
  );
}

function CardCell({ task, index }: { task: Task; index: number }) {
  const isSelected = useBoardStore((state) => state.selectedTaskId === task.id);
  const setSelectedTaskId = useBoardStore((state) => state.setSelectedTaskId);
  return (
    <li className="relative border-b border-r border-gray-300 p-5">
      {task.completed && <div className="absolute inset-0 bg-white/70" />}
      <span className="font-medium text-gray-400">
        {index < 10 ? `0${index}` : index}
      </span>
      <div className="pb-6 pt-5">
        <TaskCard
          task={task}
          isSelected={isSelected}
          onPress={() => setSelectedTaskId(task.id)}
        />
      </div>
    </li>
  );
}
