import { apiFetch, NetworkError } from "@/shared/api";
import { ErrorStatuses } from "@/shared/types/error";
import { useBoardStore } from "@/boardStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";

export function useExecuteTask() {
    const queryClient = useQueryClient();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn: (taskId: string) =>
            apiFetch(`${API_ROUTE}/task/execute/${taskId}`, {
                method: "POST",
                credentials: "include",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError: (error) => {
            if (error instanceof NetworkError) return;
            setError(ErrorStatuses.ExecutionError); // or map status codes to specific ones
        },
    });
}
