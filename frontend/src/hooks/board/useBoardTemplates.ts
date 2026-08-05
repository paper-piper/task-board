import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/routes";
import { BoardMetadata } from "@shared/types/Board";

export function useBoardTemplate() {
    return useQuery({
        queryKey: ["boardsMetadata"],
        queryFn: async (): Promise<BoardMetadata[]> => {
            const { boardsMetadata } = await apiFetch(API_ENDPOINTS.BOARD.LIST);
            return boardsMetadata;
        },
        meta: { silent: true },
    });
}
