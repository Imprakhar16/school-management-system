import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createSubjectThunk, updateSubjectThunk } from "../../features/subjects/subjectThunk";
import { resetSubjectState } from "../../features/subjects/subjectSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "../../components/toaster";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonComp from "../../components/button";

export default function AddSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 check if user came here to edit
  const editSubject = location.state?.subject || null;

  const { loading, success, error } = useSelector((state) => state.subject);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token)
      showToast({
        message: "Please login first to add or edit subjects",
        status: "info",
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: editSubject?.name || "",
      code: editSubject?.code || "",
    },
    enableReinitialize: true,
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
        return showToast({
          message: "Please login first",
          status: "info",
        });

      if (editSubject?._id) {
        // 🔹 Edit mode
        dispatch(
          updateSubjectThunk({
            _id: editSubject._id,
            updatedData: values,
          })
        );
      } else {
        // 🔹 Create mode
        dispatch(createSubjectThunk(values));
      }
    },
  });

  useEffect(() => {
    if (success) {
      showToast({
        message: editSubject ? "Subject updated successfully!" : "Subject added successfully!",
        status: "success",
      });
      formik.resetForm();
      dispatch(resetSubjectState());
      navigate("/subjects");
    }
    if (error) {
      const errorMessage =
        typeof error === "string" ? error : error.message || error.error || JSON.stringify(error);
      showToast({ message: `Failed: ${errorMessage}`, status: "error" });
    }
  }, [success, error, dispatch, formik, navigate, editSubject]);

  return (
    <>
      <ButtonComp
        title=" Back"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/teachers")}
        sx={{
          mb: 2,
          color: "primary.main",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" },
        }}
      />

      <Box sx={{ maxWidth: 600, mx: "auto", my: 5, px: 2 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
       
        </Box> */}

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#1976d2" }}>
            {editSubject ? "Edit Subject" : "Add New Subject"}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              {/* Name */}
              <TextField
                fullWidth
                label="Subject Name *"
                name="name"
                placeholder="Enter subject name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              {/* Code */}
              <TextField
                fullWidth
                label="Subject Code *"
                name="code"
                placeholder="e.g., MATH-08"
                {...formik.getFieldProps("code")}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />

              {/* Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading
                  ? editSubject
                    ? "Updating..."
                    : "Adding..."
                  : editSubject
                    ? "Update Subject"
                    : "Add Subject"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
}
