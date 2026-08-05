import { RouterProvider } from "react-router-dom";
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { router } from "./routes/router";
import { ErrorModal } from "@/components/ErrorModal";
import { NetworkError } from "@/shared/http/api";
import { useBoardStore } from "@/board_store/boardStore";
import { ErrorStatuses } from "@/shared/types/error";

function showConnectionError(error: unknown) {
    if (error instanceof NetworkError) {
        useBoardStore.getState().setError(ErrorStatuses.ServerError);
    }
}

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (query.meta?.silent) return;
            showConnectionError(error);
        },
    }),
    mutationCache: new MutationCache({ onError: showConnectionError }),
});

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ErrorModal />
        </QueryClientProvider>
    );
}
