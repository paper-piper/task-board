import { Task } from "@/types";
import { TaskCard } from "./TaskCard";

export function TaskGrid({tasks}: {tasks: Task[]}) {
    return (
        <ul className="bg-white grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] border-l border-t border-gray-300">
            {tasks.map((task, index) => (
                <li key={task.id} className="p-5 border-r border-b border-gray-300">
                    <span className="text-gray-400 font-medium">{index < 10 ? `0${index}` : index}</span>
                    <div className="pb-8 pt-5">
                        <TaskCard task={task} />
                    </div>
                </li>
            ))}
        </ul>
    )
}