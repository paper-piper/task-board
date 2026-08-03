import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";
import { BoardMetadata } from "@/shared/types/Board";

export function useBoardTemplate() {
    return useQuery({
        queryKey: ["boardsMetadata"],
        queryFn: async (): Promise<BoardMetadata[]> => {
            const res = await fetch(`${API_ROUTE}/board`);
            const { boardsMetadata } = await res.json();
            return boardsMetadata;
        },
    });
}
