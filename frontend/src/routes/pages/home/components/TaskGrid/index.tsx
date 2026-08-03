import { DndContext } from "@dnd-kit/core";
import { handleDragEnd } from "./handleDragEnd";
import { getPredecessorsLabel } from "./predecessors_parse";
import { CardCell } from "./CardCell";
import { useBoard } from "@/hooks/board/useBoard";
import { useReorderTask } from "@/hooks/board/useReorderTask";

export function TaskGrid() {
    const { data: board } = useBoard();
    const { mutate: reorderTask } = useReorderTask(); // TODO: Reorder works weird
    // TODO: INVALID login shows corret errors
    // TODO: handle backend down
    if (!board) return <></>;
    return (
        <DndContext
            onDragEnd={(e) => handleDragEnd(e, board.tasks, reorderTask)}
        >
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-px border border-gray-300 bg-gray-300">
                {board.tasks.map((task, index) => (
                    <CardCell
                        key={task.id}
                        task={task}
                        index={index + 1}
                        predecessorsLabel={
                            getPredecessorsLabel(
                                task.predecessors_ids,
                                board.tasks,
                            ) || ""
                        }
                    />
                ))}
            </ul>
        </DndContext>
    );
}
