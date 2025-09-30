import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import DummyHome from "../pages/dashboard/dummyHome.jsx"
import LoginPage from "../pages/auth/loginPage.jsx"
import PrivateRoute from "./privateRoutes.jsx"
import PublicRoute from "./publicRoutes.jsx"
import ForgotPassword from "../pages/auth/forgotPassword.jsx"

const router = createBrowserRouter([
  {
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <DummyHome />,
      },
      // Add other private routes here as needed
    ],
  },
  {
    element: <PublicRoute></PublicRoute>,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      // Add other public routes here as needed
    ],
  },
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
