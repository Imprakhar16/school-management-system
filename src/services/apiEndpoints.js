const API_PATHS = {
  AUTH: {
    LOGIN: "auth/login",
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
};

export default API_PATHS;
