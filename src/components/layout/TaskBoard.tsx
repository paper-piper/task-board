import { TaskGrid } from "../task/TaskGrid";
import { useBoardStore } from "@/store/UseBoardStore";
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

function ExecuteButton() {
  const isSelected = useBoardStore((state) => state.selectedTaskId !== "");
  const executeFn = useBoardStore((state) => state.execute);
  const BgColor = isSelected ? "bg-emerald-800" : "bg-[#79a6a4]";
  return (
    <button
      className={`h-16 w-52 rounded-md ${BgColor} px-5 text-white`}
      onClick={executeFn}
      disabled={!isSelected}
    >
      Execute Task
    </button>
  );
}

export function TaskBoard() {
  const projectTitle = "Web Development Project";
  const projectDescription =
    "Complete the project with a budget under $12,000 and before step 40 on the board.";
  const { budget, value } = useBoardStore();
  return (
    <div className="bg-[#f5f5f5] p-5">
      <div className="flex flex-row items-center justify-around p-5">
        <ProjectTitle
          title={projectTitle}
          description={projectDescription}
        ></ProjectTitle>
        <ExecuteButton />
        <ProjectInfo budget={budget} value={value}></ProjectInfo>
      </div>
      <TaskGrid />
    </div>
  );
}
