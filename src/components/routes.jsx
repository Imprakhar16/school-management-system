import LoginPage from "../pages/auth/loginPage.jsx";
import ForgotPassword from "../pages/auth/forgotPassword.jsx";
import ResetPassword from "../pages/auth/resetPassword.jsx";
import AddSubject from "../pages/subjects/createSubject.jsx";

//PrivateRoutes:-
import SubjectsList from "../pages/subjects/subjectsList.jsx";
import TeacherRegistration from "../pages/teachers/addTeacher.jsx";
import TeachersList from "../pages/teachers/teachersList.jsx";
import StudentsHome from "../pages/students/studentsHome.jsx";
import StudentForm from "../pages/students/createStudents.jsx";
import ClassList from "../pages/class/classList.jsx";
import AddClass from "../pages/class/addClass.jsx";
import SectionHome from "../pages/section/sectionsHome.jsx";
import SectionForm from "../pages/section/createSection.jsx";
import Home from "../pages/dashboard/dashboard.jsx";
import About from "../pages/about/about.jsx";
import ExamTypeList from "../pages/examination/examTypeList.jsx";
import CreateExamType from "../pages/examination/createExamType.jsx";

export const privateRoutes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    showInSidebar: true,
  },
  {
    name: "Students",
    path: "/students",
    element: <StudentsHome />,
    showInSidebar: true,
  },
  {
    name: "CreateStudents",
    path: "/create-student",
    element: <StudentForm />,
    showInSidebar: false,
  },
  {
    name: "Teachers",
    path: "/teachers",
    element: <TeachersList />,
    showInSidebar: true,
  },
  {
    name: "Subjects",
    path: "/subjects",
    element: <SubjectsList />,
    showInSidebar: true,
  },
  {
    name: "AddSubject",
    path: "/addSubject",
    element: <AddSubject />,
    showInSidebar: false,
  },
  {
    name: "Classes",
    path: "/classes",
    element: <ClassList />,
    showInSidebar: true,
  },
  {
    name: "AddClass",
    path: "/create-class",
    element: <AddClass />,
    showInSidebar: false,
  },
  {
    name: "Section",
    path: "/sections",
    element: <SectionHome />,
    showInSidebar: true,
  },
  {
    name: "Section",
    path: "/sections/form",
    element: <SectionForm />,
    showInSidebar: false,
  },
  {
    name: "AddSection",
    path: "/create-section",
    element: <SectionForm />,
    showInSidebar: false,
  },
  {
    name: "Examination Type",
    path: "/exam-type",
    element: <ExamTypeList />,
    showInSidebar: true,
  },
  {
    name: "CreateExam Type",
    path: "/createExam-type",
    element: <CreateExamType />,
    showInSidebar: false,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
    showInSidebar: true,
  },
  {
    name: "Register-Teacher",
    path: "/registerTeacher",
    element: <TeacherRegistration />,
    showInSidebar: false,
  },
  {
    name: "Add-Subject",
    path: "/addSubject",
    element: <AddSubject />,
    showInSidebar: false,
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
