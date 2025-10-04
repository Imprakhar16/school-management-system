import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sectionReducer from "./features/section/sectionSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    sections: sectionReducer,
  },
});

export default store;
