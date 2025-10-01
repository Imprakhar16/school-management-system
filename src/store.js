import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import subjectReducer from "./features/subjects/subjectSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    subject: subjectReducer,
  },
});

export default store;
