import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";
import { apiFetch } from "@/shared/api";
import { BoardMetadata } from "@/shared/types/Board";

export function useBoardTemplate() {
    return useQuery({
        queryKey: ["boardsMetadata"],
        queryFn: async (): Promise<BoardMetadata[]> => {
            const { boardsMetadata } = await apiFetch(`${API_ROUTE}/board`);
            return boardsMetadata;
        },
    });
}
