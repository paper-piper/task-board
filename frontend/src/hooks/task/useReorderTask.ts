import { apiFetch } from "@/shared/http/api";
import { API_ENDPOINTS } from "@/shared/http/routes";
import { ErrorStatuses } from "@/shared/error/types";
import { useTaskMutation } from "./useTaskMutation";

export function useReorderTask() {
    return useTaskMutation(
        ({ taskId, position }: { taskId: string; position: number }) =>
            apiFetch(API_ENDPOINTS.TASK.REORDER(taskId), {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ position }),
            }),
        ErrorStatuses.OrderError,
    );
}
