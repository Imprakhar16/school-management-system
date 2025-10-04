import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { showToast } from "../../components/toaster";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createSectionThunk,
  updateSectionThunk,
  fetchSectionsThunk,
} from "../../features/section/sectionThunk";
import ButtonComp from "../../components/button";

const SectionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const isEditMode = Boolean(editId);

  const { sections } = useSelector((state) => state.sections);

  const existingSection = isEditMode ? sections.find((section) => section._id === editId) : null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sectionId: existingSection?.sectionId || "",
      name: existingSection?.name || "",
    },
    validationSchema: Yup.object({
      sectionId: Yup.string().required("Section ID is required"),
      name: Yup.string().required("Section Name is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      if (isEditMode) {
        dispatch(updateSectionThunk({ sectionId: editId, data: values }))
          .unwrap()
          .then(() => {
            showToast({
              status: "success",
              message: "Section updated successfully!",
            });
            navigate("/section");
          })
          .catch(() => {
            showToast({ status: "error", message: "Update failed" });
            setSubmitting(false);
          });
      } else {
        dispatch(createSectionThunk(values))
          .unwrap()
          .then(() => {
            showToast({
              status: "success",
              message: "Section created successfully!",
            });
            navigate("/section");
          })
          .catch(() => {
            showToast({ status: "error", message: "Creation failed" });
            setSubmitting(false);
          });
      }
    },
  });

  useEffect(() => {
    if (isEditMode && !existingSection) {
      dispatch(fetchSectionsThunk({ page: 1, limit: 100 }));
    }
  }, [isEditMode, existingSection]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 4,
        mt: 8,
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom>
          {isEditMode ? "Edit Section" : "Create Section"}
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            id="sectionId"
            name="sectionId"
            label="Section ID"
            value={formik.values.sectionId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sectionId && Boolean(formik.errors.sectionId)}
            helperText={formik.touched.sectionId && formik.errors.sectionId}
            margin="normal"
          />
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Section Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <ButtonComp
              title={
                formik.isSubmitting ? (
                  <CircularProgress size={24} />
                ) : isEditMode ? (
                  "Update Section"
                ) : (
                  "Create Section"
                )
              }
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SectionForm;
