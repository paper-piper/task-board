import { API_ROUTE } from "@/config";
import { apiFetch, NetworkError } from "@/shared/api";
import { ErrorStatuses } from "@/shared/types/error";
import { useBoardStore } from "@/boardStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReorderTask() {
    const queryClient = useQueryClient();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn: ({
            taskId,
            position,
        }: {
            taskId: string;
            position: number;
        }) =>
            apiFetch(`${API_ROUTE}/task/reorder/${taskId}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ position }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError: (error) => {
            if (error instanceof NetworkError) return;
            setError(ErrorStatuses.OrderError);
        },
    });
}
