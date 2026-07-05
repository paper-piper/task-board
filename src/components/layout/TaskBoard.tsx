import { TaskGrid } from "../task/TaskGrid";
import { Task } from "@/types";
import { ProjectInfo } from "./ProjectInfo";

function ProjectTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mr-5 flex flex-col">
      <span className="text-3xl font-bold">{title}</span>
      <span className="text-gray-500">{description}</span>
    </div>
  );
}

export function TaskBoard({
  tasks,
  budget,
  value,
}: {
  tasks: Task[];
  budget: number;
  value: number;
}) {
  const ButtonText = "Execute Task";
  const projectTitle = "Web Development Project";
  const projectDescription =
    "Complete the project with a budget under $12,000 and before step 40 on the board.";
  return (
    <div className="bg-sky-50 p-5">
      <div className="flex flex-row items-center justify-around p-5">
        <ProjectTitle
          title={projectTitle}
          description={projectDescription}
        ></ProjectTitle>
        <button className="h-16 w-52 rounded-md bg-teal-800 px-5 text-white">
          {ButtonText}
        </button>
        <ProjectInfo budget={budget} value={value}></ProjectInfo>
      </div>
      <TaskGrid tasks={tasks} />
    </div>
  );
}
