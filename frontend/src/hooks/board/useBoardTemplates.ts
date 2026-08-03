import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";
import { apiFetch } from "@/shared/api";
import { API_ROUTES } from "@/shared/routes";
import { BoardMetadata } from "@/shared/types/Board";

export function useBoardTemplate() {
    return useQuery({
        queryKey: ["boardsMetadata"],
        queryFn: async (): Promise<BoardMetadata[]> => {
            const { boardsMetadata } = await apiFetch(
                `${API_ROUTE}${API_ROUTES.BOARD.LIST}`,
            );
            return boardsMetadata;
        },
        meta: { silent: true },
    });
}
