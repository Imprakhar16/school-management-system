import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudentThunk } from "../../features/students/studentsThunk";

const StudentsHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentThunk(1, 10));
  }, [dispatch]);

  return <div>StudentsHome</div>;
};

export default StudentsHome;
