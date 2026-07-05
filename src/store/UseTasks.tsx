import { create } from "zustand";
import { Task } from "@/types";

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
    predecessorId: ["1241341"],
  },
  {
    code: "T4",
    id: "1241343",
    title: "User authentication flow",
    cost: 600,
    value: 2000,
    steps: 8,
    predecessorId: ["1241340"],
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
    predecessorId: ["1241342"],
  },
];

type TaskState = {
  selectedTaskId: string;
  setSelectedTaskId: (id: string) => void;
  tasks: Task[];
  budget: number;
  value: number;
  error: string | null;
  executingTaskId: string | null;
};

export const useTask = create<TaskState>()((set) => ({
  selectedTaskId: "",
  setSelectedTaskId: (id: string) =>
    set((state) => ({ selectedTaskId: id === state.selectedTaskId ? "" : id })),
  tasks: sampleTasks,
  budget: 300,
  value: 0,
  error: null,
  executingTaskId: null,
}));
