import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import subjectReducer from "./features/subjects/subjectSlice";
import sectionReducer from "./features/section/sectionSlice";
import classReducer from "./features/class/classSlice";
import teacherReducer from "./features/teachers/teacherSlice";
import studentReducer from "./features/students/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    subject: subjectReducer,
    sections: sectionReducer,
    class: classReducer,
    teacher: teacherReducer,
    student: studentReducer,
  },
});

export default store;
