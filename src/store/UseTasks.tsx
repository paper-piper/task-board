import { create } from "zustand";

type TaskState = {
  selectedTaskId: string;
  setSelectedTaskId: (id: string) => void;
};

export const useTask = create<TaskState>()((set) => ({
  selectedTaskId: "",
  setSelectedTaskId: (id: string) => set({ selectedTaskId: id }),
}));
