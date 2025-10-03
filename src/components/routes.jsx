//PublicRoutes:-
import LoginPage from "../pages/auth/loginPage.jsx";
import ForgotPassword from "../pages/auth/forgotPassword.jsx";
import ResetPassword from "../pages/auth/resetPassword.jsx";

//PrivateRoutes:-
import DummyHome from "../pages/dashboard/dummyHome.jsx";

export const privateRoutes = [
  {
    name: "Home",
    path: "/",
    element: <DummyHome />,
    showInSidebar: true,
  },
  {
    name: "Students",
    path: "/students",
    element: <h1>Students</h1>,
    showInSidebar: true,
  },
  {
    name: "Teachers",
    path: "/teachers",
    element: <h1>Teachers</h1>,
    showInSidebar: true,
  },
  {
    name: "Subjects",
    path: "/subjects",
    element: <h1>Subjects</h1>,
    showInSidebar: true,
  },
  {
    name: "Classes",
    path: "/classes",
    element: <h1>Classes</h1>,
    showInSidebar: true,
  },
  {
    name: "Section",
    path: "/section",
    element: <h1>Section</h1>,
    showInSidebar: true,
  },
  {
    name: "About",
    path: "/about",
    element: <h1>About</h1>,
    showInSidebar: true,
  },
  // Add other private routes here as needed
];

export const publicRoutes = [
  {
    name: "Login",
    path: "/login",
    element: <LoginPage />,
    showInSidebar: false,
  },
  {
    name: "Forgot-Password",
    path: "/forgot-password",
    element: <ForgotPassword />,
    showInSidebar: false,
  },
  {
    name: "Reset-Password",
    path: "/reset-password/:token",
    element: <ResetPassword />,
    showInSidebar: false,
  },
  // Add other public routes here as needed
];
