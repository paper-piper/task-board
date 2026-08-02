import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { TasksBoard } from "./home";
import { CardPage } from "./card";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <TasksBoard />,
        children: [
            {
                path: "card/:cardId",
                element: <CardPage />,
            },
        ],
    },
]);
