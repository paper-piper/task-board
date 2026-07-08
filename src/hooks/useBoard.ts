import { useBoardStore } from "@/store/boardStore";

export function useSelectedTaskId() {
  return useBoardStore((state) => state.selectedTaskId);
}

export function useIsTaskSelected(taskId: string) {
  return useBoardStore((state) => state.selectedTaskId === taskId);
}
