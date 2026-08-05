import { apiFetch } from "@/shared/http/api";
import { API_ENDPOINTS } from "@/shared/http/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useTaskMutation } from "./useTaskMutation";

export function useExecuteTask() {
    return useTaskMutation(
        (taskId: string) =>
            apiFetch(API_ENDPOINTS.TASK.EXECUTE(taskId), {
                method: "POST",
                credentials: "include",
            }),
        ErrorStatuses.ExecutionError,
    );
}
