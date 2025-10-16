import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getTeacherThunk,
  registerTeacherThunk,
  updateTeacherThunk,
} from "../../features/teachers/teacherThunk";
import { fetchAllSubjectsThunk } from "../../features/subjects/subjectThunk";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonComp from "../../components/button";
import { createTeacherSchema } from "../../validations/validation";
import { useNavigate, useParams } from "react-router-dom";

export default function TeacherRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { teacherDetails, loading } = useSelector((state) => state.teacher);
  const { data: subjectsList = [] } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getTeacherThunk(id));
    }
  }, [dispatch, id, isEdit]);

  const extractSubjectIds = (subjects) =>
    Array.isArray(subjects) ? subjects.map((sub) => (typeof sub === "object" ? sub._id : sub)) : [];

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      EmpId: teacherDetails?.EmpId || "",
      firstname: teacherDetails?.firstname || "",
      lastname: teacherDetails?.lastname || "",
      gender: teacherDetails?.gender || "",
      email: teacherDetails?.email || "",
      phoneNumber: teacherDetails?.phoneNumber || "",
      password: "",
      experienceDuration: formatDateForInput(teacherDetails?.experienceDuration) || "",
      experienceDetails: teacherDetails?.experienceDetails || "",
      subjects: extractSubjectIds(teacherDetails?.subjects) || [],
      isActive: teacherDetails?.isActive ?? true,
    },
    validationSchema: loading ? null : createTeacherSchema,

    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, val]) => {
        if (key === "subjects" && Array.isArray(val)) {
          val.forEach((s) => formData.append("subjects[]", s));
        } else if (key === "EmpId") {
          formData.append("EmpId", Number(val));
        } else if (key === "experienceDuration") {
          formData.append("experienceDuration", new Date(val).toISOString());
        } else if (key === "isActive") {
          formData.append("isActive", String(val));
        } else if (key === "password" && !val && isEdit) {
          // Skip empty password in edit mode
        } else {
          formData.append(key, val);
        }
      });

      if (isEdit) {
        dispatch(updateTeacherThunk({ id, body: formData }));
      } else {
        dispatch(registerTeacherThunk(formData));
      }

      resetForm();
      navigate("/teachers");
    },
  });

  if (isEdit && loading && !teacherDetails) {
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
        onClick={() => navigate("/teachers")}
        sx={{
          mb: 2,
          color: "primary.main",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" },
        }}
      />

      <Box sx={{ maxWidth: 800, mx: "auto", my: 5, px: 2 }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#1976d2" }}>
            {isEdit ? "Edit Teacher" : "Add New Teacher"}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              {/* BASIC DETAILS */}
              <TextField
                fullWidth
                label="Employee ID *"
                {...formik.getFieldProps("EmpId")}
                error={formik.touched.EmpId && Boolean(formik.errors.EmpId)}
                helperText={formik.touched.EmpId && formik.errors.EmpId}
              />
              <TextField
                fullWidth
                label="First Name *"
                {...formik.getFieldProps("firstname")}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
              <TextField
                fullWidth
                label="Last Name *"
                {...formik.getFieldProps("lastname")}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
              />

              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Gender
              </Typography>
              <RadioGroup
                row
                {...formik.getFieldProps("gender")}
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>

              {/* CONTACT */}
              {!isEdit && (
                <TextField
                  fullWidth
                  label="Email *"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              )}
              <TextField
                fullWidth
                label="Phone Number *"
                {...formik.getFieldProps("phoneNumber")}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
              {!isEdit && (
                <TextField
                  fullWidth
                  label="Password *"
                  type="password"
                  {...formik.getFieldProps("password")}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              )}

              {/* SUBJECTS */}
              <FormControl
                fullWidth
                error={formik.touched.subjects && Boolean(formik.errors.subjects)}
              >
                <InputLabel id="subjects-label">Subjects</InputLabel>
                <Select
                  labelId="subjects-label"
                  multiple
                  input={<OutlinedInput label="Subjects" />}
                  value={formik.values.subjects}
                  onChange={(e) => formik.setFieldValue("subjects", e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((id) => {
                        const subj = subjectsList.find((s) => s._id === id);
                        return <Chip key={id} label={subj ? `${subj.name} (${subj.code})` : id} />;
                      })}
                    </Box>
                  )}
                >
                  {subjectsList.map((subj) => (
                    <MenuItem key={subj._id} value={subj._id}>
                      {subj.name} ({subj.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* EXPERIENCE */}
              <TextField
                fullWidth
                type="date"
                label="Experience Duration"
                InputLabelProps={{ shrink: true }}
                {...formik.getFieldProps("experienceDuration")}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Experience Details"
                {...formik.getFieldProps("experienceDetails")}
              />

              {/* ACTIVE STATUS */}
              <FormControl fullWidth>
                <InputLabel id="isActive-label">Status</InputLabel>
                <Select
                  labelId="isActive-label"
                  value={formik.values.isActive ? "true" : "false"}
                  onChange={(e) => formik.setFieldValue("isActive", e.target.value === "true")}
                  label="Status"
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>

              <Divider />

              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading
                  ? isEdit
                    ? "Updating..."
                    : "Registering..."
                  : isEdit
                    ? "Update Teacher"
                    : "Register Teacher"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
}
