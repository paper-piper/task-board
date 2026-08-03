import { API_ROUTE } from "@/config";
import { apiFetch } from "@/shared/api";
import { API_ROUTES } from "@/shared/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useTaskMutation } from "./useTaskMutation";

export function useReorderTask() {
    return useTaskMutation(
        ({ taskId, position }: { taskId: string; position: number }) =>
            apiFetch(`${API_ROUTE}${API_ROUTES.TASK.REORDER(taskId)}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ position }),
            }),
        ErrorStatuses.OrderError,
    );
}
