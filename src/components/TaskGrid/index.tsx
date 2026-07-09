import { useBoardStore } from "@/store/boardStore";
import { DndContext } from "@dnd-kit/core";
import { handleDragEnd } from "./handleDragEnd";
import { getPredecessorsLabel } from "./predecessors_parse";
import { CardCell } from "./CardCell";

export function TaskGrid() {
  const tasks = useBoardStore((state) => state.tasks);
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
