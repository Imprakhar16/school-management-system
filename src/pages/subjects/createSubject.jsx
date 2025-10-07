import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createSubjectThunk } from "../../features/subjects/subjectThunk";
import { resetSubjectState } from "../../features/subjects/subjectSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/toaster";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddSubject() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.subject);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) showToast({ message: "Please login first to add subjects", status: "info" });
  }, []);

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

  useEffect(() => {
    if (success) {
      showToast({ message: "Subject created successfully!", status: "success" });
      formik.resetForm();
      dispatch(resetSubjectState());
      navigate("/subjects");
    }
    if (error) {
      const errorMessage =
        typeof error === "string" ? error : error.message || error.error || JSON.stringify(error);
      showToast({ message: `Failed: ${errorMessage}`, status: "error" });
    }
  }, [success, error, dispatch, formik, navigate]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 5, px: 2, fontFamily: '"Roboto", sans-serif' }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#1976d2" }}>
          Add New Subject
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            {/* Name */}
            <TextField
              fullWidth
              label="Name *"
              name="name"
              placeholder="Enter subject name"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            {/* Code */}
            <TextField
              fullWidth
              label="Code *"
              name="code"
              placeholder="e.g., MATH-08"
              {...formik.getFieldProps("code")}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />

            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Subject"}
              </Button>
              <Button
                fullWidth
                type="button"
                variant="outlined"
                color="primary"
                onClick={formik.resetForm}
                disabled={loading}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
