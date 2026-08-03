import { API_ROUTE } from "@/config";
import { ErrorStatuses } from "@/shared/types/error";
import { useBoardStore } from "@/store/boardStore";
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
            fetch(`${API_ROUTE}/task/reorder/${taskId}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ position }),
            }).then((res) => {
                if (!res.ok) throw new Error(res.status.toString());
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError: () => {
            setError(ErrorStatuses.OrderError);
        },
    });
}
