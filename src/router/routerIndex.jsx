import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DummyHome from "../pages/dashboard/dummyHome.jsx";
import LoginPage from "../pages/auth/loginPage.jsx";
import PrivateRoute from "./privateRoutes.jsx";
import PublicRoute from "./publicRoutes.jsx";
import StudentForm from "../pages/students/createStudents.jsx";
import ForgotPassword from "../pages/auth/forgotPassword.jsx";
import ResetPassword from "../pages/auth/resetPassword.jsx";
import SectionForm from "../pages/section/createSection.jsx";
import SectionHome from "../pages/section/sectionsHome.jsx";

const router = createBrowserRouter([
  {
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <DummyHome />,
      },
      {
        path: "/add-student",
        element: <StudentForm />,
      },
      {
        path: "/create-section",
        element: <SectionForm />,
      },
      {
        path: "/edit-section/:id",
        element: <SectionForm />,
      },
      {
        path: "/section",
        element: <SectionHome />,
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
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      // Add other public routes here as needed
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
