import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./home";
import { CardPage } from "./card";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "card/:cardId",
        element: <CardPage />,
      },
    ],
  },
]);
