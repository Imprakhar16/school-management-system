const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
  },
  STUDENT: {
    CREATE_STUDENT: "/student/create",
    ALL_STUDENTS: "/student/students",
    UPDATE_STUDENT: "/student/update",
    DELETE_STUDENT: "/student/delete",
  },
  SUBJECT: {
    CREATE_SUBJECT: "subject/create",
    ALL_SUBJECTS: "subject/subjects",
    GET_BY_ID: "subject/details",
    UPDATE_SUBJECT: "subject/update",
    DELETE_SUBJECT: "subject/delete",
  },
  SECTION: {
    GET: "section/sections",
    CREATE: "section/create",
    DELETE: "section/delete",
    UPDATE: "section/update",
  },
  ClASS: {
    CLASS_LIST: "/class/classes",
    CREATE_CLASS: "/class/create",
    EDIT_CLASS: "/class/update",
    DELETE_CLASS: "/class/delete",
  },
  TEACHER: {
    LOGIN: "teacher/login",
    REGISTER: "teacher/create",
    ALL_TEACHERS: "teacher/teachers",
    GET_BY_ID: "teacher/details",
    UPDATE_TEACHER: "teacher/update",
    DELETE_TEACHER: "teacher/delete",
  },
};

export default API_PATHS;
