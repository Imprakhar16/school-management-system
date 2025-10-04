import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createSubjectThunk } from "../../features/subjects/subjectThunk";
import { resetSubjectState } from "../../features/subjects/subjectSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/toaster";

export default function AddSubject() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.subject);
  const navigate = useNavigate();

  // Token check once
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) showToast({ message: "Please login first to add subjects", status: "info" });
  }, []);

  // Formik + Yup setup
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters"),
      code: Yup.string()
        .required("Code is required")
        .matches(/^[A-Z0-9-]+$/i, "Code must contain only letters, numbers, and hyphens")
        .min(2, "Code must be at least 2 characters")
        .max(20, "Code must not exceed 20 characters"),
    }),
    onSubmit: (values) => {
      const token = localStorage.getItem("authToken");
      if (!token)
        return showToast({ message: "Please login first to add subjects", status: "info" });

      dispatch(createSubjectThunk(values));
    },
  });

  // Handle success/error with toast
  useEffect(() => {
    if (success) {
      showToast({ message: "Subject created successfully!", status: "success" });
      formik.resetForm();
      dispatch(resetSubjectState());
      navigate("/allSubjects");
    }
    if (error) {
      const errorMessage =
        typeof error === "string" ? error : error.message || error.error || JSON.stringify(error);
      showToast({ message: `Failed: ${errorMessage}`, status: "error" });
    }
  }, [success, error, dispatch, formik, navigate]);

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    border: `1px solid ${formik.touched[field] && formik.errors[field] ? "#d32f2f" : "#c4c4c4"}`,
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s",
  });

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          padding: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "24px",
            color: "#1976d2",
          }}
        >
          Add New Subject
        </h1>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#333",
              }}
            >
              Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter subject name"
              {...formik.getFieldProps("name")}
              style={inputStyle("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Code */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#333",
              }}
            >
              Code *
            </label>
            <input
              type="text"
              name="code"
              placeholder="e.g., MATH-08"
              {...formik.getFieldProps("code")}
              style={inputStyle("code")}
            />
            {formik.touched.code && formik.errors.code && (
              <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                {formik.errors.code}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: "14px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#fff",
                backgroundColor: loading ? "#9e9e9e" : "#1976d2",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Adding..." : "Add Subject"}
            </button>
            <button
              type="button"
              onClick={formik.resetForm}
              disabled={loading}
              style={{
                flex: 1,
                padding: "14px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#1976d2",
                backgroundColor: "#fff",
                border: "1px solid #1976d2",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
