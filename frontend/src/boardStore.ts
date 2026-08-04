import { create } from "zustand";
import { ErrorStatus, ErrorStatuses } from "@/shared/types/error";

type Board = {
    selectedTaskId: string;
    error: ErrorStatus;
    errorDetails?: string;
    setSelectedTaskId: (id: string) => void;
    setError: (errorStatus: ErrorStatus, errorDetails?: string) => void;
};

export const useBoardStore = create<Board>()((set, get) => ({
    selectedTaskId: "",
    error: ErrorStatuses.NoError,
    errorDetails: undefined,

    setSelectedTaskId: (id: string) =>
        set((state) => ({
            selectedTaskId: id === state.selectedTaskId ? "" : id,
        })),

    setError: (errorStatus: ErrorStatus, errorDetails?: string) =>
        set({ error: errorStatus, errorDetails }),
}));
