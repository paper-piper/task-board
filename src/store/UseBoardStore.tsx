import { create } from "zustand";
import { Task, ErrorStatus, ErrorStatuses } from "@/types";
import { ValidateExecution } from "@/lib/validation";
import { ReorderTask } from "@/lib/reorder";

export const sampleTasks: Task[] = [
  {
    code: "T1",
    id: "1241340",
    title: "Design system audit",
    cost: 150,
    value: 800,
    steps: 3,
  },
  {
    code: "T2",
    id: "1241341",
    title: "Functional spec. of the Website",
    cost: 200,
    value: 1000,
    steps: 0,
  },
  {
    code: "T3",
    id: "1241342",
    title: "Set up CI/CD pipeline",
    cost: 400,
    value: 1200,
    steps: 5,
    predecessors_ids: ["1241341"],
  },
  {
    code: "T4",
    id: "1241343",
    title: "User authentication flow",
    cost: 600,
    value: 2000,
    steps: 8,
    predecessors_ids: ["1241340"],
  },
  {
    code: "T5",
    id: "1241344",
    title: "Fix responsive layout bugs",
    cost: 100,
    value: 300,
    steps: 2,
  },
  {
    code: "T6",
    id: "1241345",
    title: "Write API documentation",
    cost: 250,
    value: 500,
    steps: 4,
    predecessors_ids: ["1241342"],
  },
];

type Board = {
  selectedTaskId: string;
  setSelectedTaskId: (id: string) => void;
  tasks: Task[];
  budget: number;
  value: number;
  error: string;
  ResetError: () => void;
  RaiseOrderError: () => void;
  ReorderTasks: (taskId: string, index: number) => void;
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

  ResetError: () => set({ error: ErrorStatuses.NoError }),

  RaiseOrderError: () => set({ error: ErrorStatuses.OrderError }),

  ReorderTasks: (taskId: string, index: number) =>
    set((state) => ({ tasks: ReorderTask(state.tasks, taskId, index) })),

  execute: () => {
    const { tasks, budget, selectedTaskId } = get();
    const task = tasks.find((t) => t.id === selectedTaskId);
    if (!task) {
      return;
    }

    if (!ValidateExecution(task, budget, tasks)) {
      set({ error: ErrorStatuses.ExecutionError });
      console.log("Invalid execution!");
      return;
    }
    console.log("Horray!");
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
