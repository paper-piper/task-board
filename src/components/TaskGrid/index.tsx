import { useBoardStore } from "@/store/boardStore";
import { DndContext } from "@dnd-kit/core";
import { handleDragEnd } from "./handleDragEnd";
import { getPredecessorsLabel } from "./predecessors_parse";
import { CardCell } from "./CardCell";

export function TaskGrid() {
  const tasks = useBoardStore((state) => state.tasks);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-px border border-gray-300 bg-gray-300">
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
