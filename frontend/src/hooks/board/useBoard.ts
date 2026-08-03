import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";
import { Board } from "@/shared/types/Board";

export function useBoard() {
    return useQuery({
        queryKey: ["board"],
        queryFn: (): Promise<Board> =>
            fetch(`${API_ROUTE}/board/current`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => data.board),
    });
}
