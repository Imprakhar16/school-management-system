import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Box, TextField, CircularProgress, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  createSectionThunk,
  getSectionDetailThunk,
  updateSectionThunk,
} from "../../features/section/sectionThunk";
import { showToast } from "../../components/toaster";
import ButtonComp from "../../components/button";
import { createSectionSchema } from "../../validations/validation";
import { pageBack } from "../../constants/constantsUI";

const SectionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { sectionDetails, loading } = useSelector((state) => state.sections);

  const isEditMode = id ? true : false;

  const getDetails = async () => {
    if (id) {
      dispatch(getSectionDetailThunk(id));
    } else {
      return null;
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: sectionDetails?.name || "",
    },
    validationSchema: createSectionSchema,
    onSubmit: (values, { setSubmitting }) => {
      const action = isEditMode
        ? updateSectionThunk({ sectionId: sectionDetails._id, data: values })
        : createSectionThunk(values);

      dispatch(action)
        .unwrap()
        .then(() => {
          showToast({
            status: "success",
            message: isEditMode ? "Section updated successfully!" : "Section created successfully!",
          });
          navigate("/sections");
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <>
      <ButtonComp
        title={pageBack}
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/sections")}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isEditMode ? "Edit Section" : "Create Section"}
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Section Name"
            value={loading ? "" : formik.values.name}
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
    </>
  );
};

export default SectionForm;
