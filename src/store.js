import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import subjectReducer from "./features/subjects/subjectSlice";
import sectionReducer from "./features/section/sectionSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    subject: subjectReducer,
     sections: sectionReducer,   
  },
});

export default store;
