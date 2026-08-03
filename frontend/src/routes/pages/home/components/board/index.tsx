import { TaskGrid } from "@/routes/pages/home/components/TaskGrid";
import { useBoardStore } from "@/boardStore";
import { ProjectDetails } from "./ProjectDetails";
import { motion } from "framer-motion";
import { useExecuteTask } from "@/hooks/board/useExecuteTask";

function ProjectTitle({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex flex-col">
            <span className="font-display text-3xl font-bold">{title}</span>
            <span className="text-gray-500">{description}</span>
        </div>
    );
}

function ExecuteButton() {
    const selectedTaskId = useBoardStore((state) => state.selectedTaskId);
    const { mutate: executeTask, isPending } = useExecuteTask();
    const isSelected = selectedTaskId !== "";
    const BgColor = isSelected ? "bg-emerald-800" : "bg-[#79a6a4]";
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`h-16 w-52 rounded-md ${BgColor} text-white`}
            onClick={() => executeTask(selectedTaskId)}
            disabled={!isSelected || isPending}
        >
            {isPending ? "Executing..." : "Execute Task"}
        </motion.button>
    );
}

export function TaskBoard() {
    const projectTitle = "Web Development Project";
    const projectDescription =
        "Complete the project with a budget under $12,000 and before step 40 on the board.";
    return (
        <div className="min-w-0 flex-1 bg-[#f5f5f5] p-5">
            <div className="flex flex-row items-center justify-between gap-5 p-5">
                <ProjectTitle
                    title={projectTitle}
                    description={projectDescription}
                ></ProjectTitle>
                <ExecuteButton />
                <ProjectDetails></ProjectDetails>
            </div>
            <TaskGrid />
        </div>
    );
}
