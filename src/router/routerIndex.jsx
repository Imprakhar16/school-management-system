import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import DummyHome from "../pages/dashboard/dummyHome.jsx"
import LoginPage from "../pages/auth/loginPage.jsx"
import PrivateRoute from "./privateRoutes.jsx"
import PublicRoute from "./publicRoutes.jsx"
import TeacherRegistration from "../pages/teachers/addTeacher.jsx"

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
        path: "/teacherRegister",
        element: <TeacherRegistration />,
      },
    ],
  },
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
