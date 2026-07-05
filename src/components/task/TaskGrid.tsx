import { Task } from "@/types";
import { TaskCard } from "./TaskCard";

export function TaskGrid({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="grid grid-cols-1 border-l border-t border-gray-300 bg-white sm:grid-cols-2 lg:grid-cols-4">
      {tasks.map((task, index) => (
        <li key={task.id} className="border-b border-r border-gray-300 p-5">
          <span className="font-medium text-gray-400">
            {index < 10 ? `0${index}` : index}
          </span>
          <div className="pb-8 pt-5">
            <TaskCard task={task} />
          </div>
        </li>
      ))}
    </ul>
  );
}
