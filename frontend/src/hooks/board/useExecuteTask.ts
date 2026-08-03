import { ErrorStatuses } from "@/shared/types/error";
import { useBoardStore } from "@/store/boardStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";

export function useExecuteTask() {
    const queryClient = useQueryClient();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn: (taskId: string) =>
            fetch(`${API_ROUTE}/task/execute/${taskId}`, {
                method: "POST",
                credentials: "include",
            }).then((res) => {
                if (!res.ok) throw new Error(res.status.toString());
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError: () => {
            setError(ErrorStatuses.ExecutionError); // or map status codes to specific ones
        },
    });
}
