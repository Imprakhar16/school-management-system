import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout.jsx";
import PrivateRoute from "./privateRoutes.jsx";
import PublicRoute from "./publicRoutes.jsx";
import { privateRoutes, publicRoutes } from "../components/routes.jsx";

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: privateRoutes.map((route) => ({
          path: route.path,
          element: route.element,
        })),
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: publicRoutes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
