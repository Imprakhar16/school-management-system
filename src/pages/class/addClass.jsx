import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonComp from "../../components/button";
import { createClassThunk, editClassThunk } from "../../features/class/classThunk";
import { fetchSectionsThunk } from "../../features/section/sectionThunk";
import { fetchAllSubjectsThunk } from "../../features/subjects/subjectThunk";
import { fetchAllTeachersThunk } from "../../features/teachers/teacherThunk";
import { addClassSchema } from "../../validations/validation";

export default function AddClass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classData = location.state?.classData; //For edit

  const { sections } = useSelector((state) => state.sections);
  const { data } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teacher);

  const formik = useFormik({
    initialValues: {
      name: classData?.name || "",
      subjects: classData?.subjects?.map((s) => s._id) || [],
      sections: classData?.sections?.map((s) => s._id) || [],
      classincharge: classData?.classincharge?._id || "",
    },
    validationSchema: addClassSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (classData) {
        await dispatch(editClassThunk({ id: classData._id, data: values })).unwrap();
        resetForm();
      } else {
        await dispatch(createClassThunk(values)).unwrap();
        resetForm();
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    navigate("/classes");
  };

  useEffect(() => {
    dispatch(fetchSectionsThunk(1, 10));
    dispatch(fetchAllSubjectsThunk(1, 100));
    dispatch(fetchAllTeachersThunk(1, 100));
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 4, mt: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom>
          {classData ? "Edit Class" : "Create Class"}
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          {/* Class Name */}
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Class Name"
            // disabled= {classData.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />

          {/* Subjects Multi-Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="subjects-label">Subjects</InputLabel>
            <Select
              labelId="subjects-label"
              id="subjects"
              name="subjects"
              multiple
              value={formik.values.subjects}
              onChange={formik.handleChange}
              input={<OutlinedInput label="Subjects" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const sub = data.find((s) => s._id === id);
                    return <Chip key={id} label={sub?.name || ""} />;
                  })}
                </Box>
              )}
            >
              {data.map((s) => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name} ({s.code})
                </MenuItem>
              ))}
            </Select>
            {formik.touched.subjects && formik.errors.subjects && (
              <Typography color="error" variant="caption">
                {formik.errors.subjects}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="classIncharge-label">Class Incharge</InputLabel>
            <Select
              labelId="classIncharge-label"
              id="classincharge"
              name="classincharge"
              value={formik.values.classincharge}
              onChange={formik.handleChange}
              input={<OutlinedInput label="Class Incharge" />}
            >
              {teachers.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  {t.firstname} {t.lastname}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.classincharge && formik.errors.classincharge && (
              <Typography color="error" variant="caption">
                {formik.errors.classincharge}
              </Typography>
            )}
          </FormControl>

          {/* Sections Multi-Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="sections-label">Sections</InputLabel>
            <Select
              labelId="sections-label"
              id="sections"
              name="sections"
              multiple
              value={formik.values.sections}
              onChange={formik.handleChange}
              input={<OutlinedInput label="Sections" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const sec = sections.find((s) => s._id === id);
                    return <Chip key={id} label={sec?.name || ""} />;
                  })}
                </Box>
              )}
            >
              {sections.map((sec) => (
                <MenuItem key={sec._id} value={sec._id}>
                  {sec.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.sections && formik.errors.sections && (
              <Typography color="error" variant="caption">
                {formik.errors.sections}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <ButtonComp
              title={
                formik.isSubmitting ? (
                  <CircularProgress size={24} />
                ) : classData ? (
                  "Update Class"
                ) : (
                  "Create Class"
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
}
