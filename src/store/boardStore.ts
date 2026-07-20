import { create } from "zustand";
import { ErrorStatuses } from "@/shared/types/error";
import { Task } from "@/shared/types/Task";
import { ValidateExecution } from "@/shared/validation/execution";
import { ReorderTask } from "./sortOrder";
import { sampleTasks } from "../mock_data/sampleTasks";

type Board = {
  selectedTaskId: string;
  setSelectedTaskId: (id: string) => void;
  tasks: Task[];
  budget: number;
  value: number;
  error: string;
  resetError: () => void;
  raiseOrderError: () => void;
  reorderTasks: (taskId: string, index: number) => void;
  execute: () => void;
};

export const useBoardStore = create<Board>()((set, get) => ({
  selectedTaskId: "",
  setSelectedTaskId: (id: string) =>
    set((state) => ({ selectedTaskId: id === state.selectedTaskId ? "" : id })),

  tasks: sampleTasks,
  budget: 12000,
  value: 0,
  error: ErrorStatuses.NoError,

  resetError: () => set({ error: ErrorStatuses.NoError }),

  raiseOrderError: () => set({ error: ErrorStatuses.OrderError }),

  reorderTasks: (taskId: string, index: number) =>
    set((state) => ({ tasks: ReorderTask(state.tasks, taskId, index) })),

  execute: () => {
    const { tasks, budget, selectedTaskId } = get();
    const task = tasks.find((t) => t.id === selectedTaskId);
    if (!task) {
      return;
    }

    if (!ValidateExecution(task, tasks)) {
      set({ error: ErrorStatuses.ExecutionError });
      return;
    }

    if (task.cost > budget) {
      set({ error: ErrorStatuses.PriceError });
      return;
    }
    set((state) => ({
      tasks: tasks.map((t) =>
        t.id === task.id ? { ...t, completed: true } : t,
      ),
      budget: state.budget - task.cost,
      value: state.value + task.value,
    }));
    set({ selectedTaskId: "" });
  },
}));

export function useSelectedTaskId() {
  return useBoardStore((state) => state.selectedTaskId);
}

export function useIsTaskSelected(taskId: string) {
  return useBoardStore((state) => state.selectedTaskId === taskId);
}
