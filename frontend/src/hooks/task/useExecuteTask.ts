import { API_BASE_URL } from "@/config";
import { apiFetch } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useTaskMutation } from "./useTaskMutation";

export function useExecuteTask() {
    return useTaskMutation(
        (taskId: string) =>
            apiFetch(`${API_BASE_URL}${API_ENDPOINTS.TASK.EXECUTE(taskId)}`, {
                method: "POST",
                credentials: "include",
            }),
        ErrorStatuses.ExecutionError, // or map status codes to specific ones
    );
}
