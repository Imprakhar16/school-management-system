import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createSubjectThunk,
  updateSubjectThunk,
  getSubjectThunk,
} from "../../features/subjects/subjectThunk";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper, Stack, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonComp from "../../components/button";
import { subjectSchema } from "../../validations/validation";

export default function AddSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { subjectDetails, loading } = useSelector((state) => state.subject);

  useEffect(() => {
    if (isEdit) {
      dispatch(getSubjectThunk(id));
    }
  }, [dispatch, id, isEdit]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: subjectDetails?.name || "",
      code: subjectDetails?.code || "",
    },
    validationSchema: loading ? null : subjectSchema,
    onSubmit: (values) => {
      if (isEdit) {
        dispatch(updateSubjectThunk({ _id: id, updatedData: values }));
      } else {
        dispatch(createSubjectThunk(values));
      }
      formik.resetForm();
      navigate("/subjects");
    },
  });

  if (isEdit && loading && !subjectDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ButtonComp
        title=" Back"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/subjects")}
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
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#1976d2" }}>
            {isEdit ? "Edit Subject" : "Add New Subject"}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Subject Name *"
                name="name"
                placeholder="Enter subject name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                label="Subject Code *"
                name="code"
                placeholder="e.g., MATH-08"
                {...formik.getFieldProps("code")}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading
                  ? isEdit
                    ? "Updating..."
                    : "Adding..."
                  : isEdit
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
