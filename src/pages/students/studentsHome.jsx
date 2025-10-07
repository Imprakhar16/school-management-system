import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentThunk } from "../../features/students/studentsThunk";

const StudentsHome = () => {
  const dispatch = useDispatch();

  const [page] = useState(1);
  const [limit] = useState(10);

  const { students } = useSelector((state) => state.student);
  console.log(students);

  useEffect(() => {
    dispatch(fetchStudentThunk(page, limit));
  }, [dispatch]);

  return <div>StudentsHome</div>;
};

export default StudentsHome;
