import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { showToast } from "../../components/toaster";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createSectionThunk,
  updateSectionThunk,
  fetchSectionsThunk,
} from "../../features/section/sectionThunk";
import ButtonComp from "../../components/button";
import { createSectionSchema } from "../../validations/validation";

const SectionForm = ({ onSuccess, onFailed }) => {
  const dispatch = useDispatch();
  const { id: editId } = useParams();
  const isEditMode = Boolean(editId);

  const { sections } = useSelector((state) => state.sections);

  const existingSection = isEditMode ? sections.find((section) => section._id === editId) : null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: existingSection?.name || "",
    },
    validationSchema: createSectionSchema,
    onSubmit: (values) => {
      console.log(values);
      if (isEditMode) {
        dispatch(updateSectionThunk({ sectionId: editId, data: values }))
          .unwrap()
          .then(() => {
            showToast({
              status: "success",
              message: "Section updated successfully!",
            });

            onSuccess();
          })
          .catch(() => onFailed());
      } else {
        dispatch(createSectionThunk(values))
          .unwrap()
          .then(() => {
            showToast({
              status: "success",
              message: "Section created successfully!",
            });

            onSuccess();
          })
          .catch(() => onFailed());
      }
    },
  });

  useEffect(() => {
    if (isEditMode && !existingSection) {
      dispatch(fetchSectionsThunk({ page: 1, limit: 100 }));
    }
  }, [dispatch, isEditMode, existingSection]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 0,
        mt: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit} noValidate>
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
    </Box>
  );
};

export default SectionForm;
