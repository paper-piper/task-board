import { API_ROUTE } from "@/config";
import { apiFetch } from "@/shared/api";
import { API_ROUTES } from "@/shared/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useTaskMutation } from "./useTaskMutation";

export function useExecuteTask() {
    return useTaskMutation(
        (taskId: string) =>
            apiFetch(`${API_ROUTE}${API_ROUTES.TASK.EXECUTE(taskId)}`, {
                method: "POST",
                credentials: "include",
            }),
        ErrorStatuses.ExecutionError, // or map status codes to specific ones
    );
}
