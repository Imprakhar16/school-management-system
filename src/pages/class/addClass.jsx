import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/button";
import { useDispatch } from "react-redux";
import { createClassThunk } from "../../features/class/classThunk";

export default function AddClass() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      subjects: "",
      sections: "",
    },
    validationSchema: Yup.object({
      name: Yup.string() | Yup.number().required("Name is required"),
    }),
    onSubmit: (values) => {
      dispatch(createClassThunk(values));
    },
  });

  return (
    <div>
      <input type="text" value={formik.name} />
    </div>
  );
}
