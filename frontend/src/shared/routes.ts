export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
    },
    BOARD: {
        LIST: "/board",
        CURRENT: "/board/current",
    },
    TASK: {
        REORDER: (taskId: string) => `/task/reorder/${taskId}`,
        EXECUTE: (taskId: string) => `/task/execute/${taskId}`,
    },
} as const;
