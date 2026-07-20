import { create } from "zustand";
import { ErrorStatus, ErrorStatuses } from "@/shared/types/error";
import { Task } from "@/shared/types/Task";
import { ValidateExecution } from "@/shared/validation/execution";
import { ReorderTask } from "./sortOrder";
import { sampleTasks } from "@/mock_data/sampleTasks";

type Board = {
  selectedTaskId: string;
  tasks: Task[];
  budget: number;
  value: number;
  error: ErrorStatus;
  setSelectedTaskId: (id: string) => void;
  setError: (errorStatus: ErrorStatus) => void;
  reorderTasks: (taskId: string, index: number) => void;
  execute: () => void;
};

export const useBoardStore = create<Board>()((set, get) => ({
  selectedTaskId: "",
  tasks: sampleTasks,
  budget: 12000,
  value: 0,
  error: ErrorStatuses.NoError,

  setSelectedTaskId: (id: string) =>
    set((state) => ({ selectedTaskId: id === state.selectedTaskId ? "" : id })),

  setError: (errorStatus: ErrorStatus) => set({ error: errorStatus }),

  reorderTasks: (taskId: string, index: number) =>
    set((state) => ({ tasks: ReorderTask(state.tasks, taskId, index) })),

  execute: () => {
    const { tasks, budget, selectedTaskId, setError } = get();
    const task = tasks.find((t) => t.id === selectedTaskId);
    if (!task) {
      return;
    }

    if (!ValidateExecution(task, tasks)) {
      setError(ErrorStatuses.ExecutionError);
      return;
    }

    if (task.cost > budget) {
      setError(ErrorStatuses.PriceError);
      return;
    }
    set((state) => ({
      tasks: tasks.map((t) =>
        t.id === task.id ? { ...t, completed: true } : t,
      ),
      budget: state.budget - task.cost,
      value: state.value + task.value,
      selectedTaskId: "",
    }));
  },
}));
