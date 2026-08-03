import { create } from "zustand";
import { ErrorStatus, ErrorStatuses } from "@/shared/types/error";

type Board = {
    selectedTaskId: string;
    error: ErrorStatus;
    setSelectedTaskId: (id: string) => void;
    setError: (errorStatus: ErrorStatus) => void;
};

export const useBoardStore = create<Board>()((set, get) => ({
    selectedTaskId: "",
    error: ErrorStatuses.NoError,

    setSelectedTaskId: (id: string) =>
        set((state) => ({
            selectedTaskId: id === state.selectedTaskId ? "" : id,
        })),

    setError: (errorStatus: ErrorStatus) => set({ error: errorStatus }),
}));
