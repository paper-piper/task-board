import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { setAndParseError } from "@/shared/error/connectionError";
import { NetworkError } from "@/shared/http/api";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (query.meta?.silent) return;
            setAndParseError(error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            if (!mutation.meta?.silent && error instanceof NetworkError) setAndParseError(error);
        },
    }),
});
