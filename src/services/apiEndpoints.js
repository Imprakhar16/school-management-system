const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_TEACHER: "teacher/login",
    LOGIN_STUDENT: "student/login",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
  },
  USER: {
    // users endpoint
  },
  SUBJECT: {
    CREATE_SUBJECT: "subject/create",
    ALL_SUBJECTS: "subject/subjects",
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
    UPDATE_TEACHER: "teacher/update",
    DELETE_TEACHER: "teacher/delete",
  },
};

export default API_PATHS;
