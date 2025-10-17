import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { fetchAllSubjectsThunk } from "../../features/subjects/subjectThunk";
import {
  getTeacherThunk,
  registerTeacherThunk,
  updateTeacherThunk,
} from "../../features/teachers/teacherThunk";
import ButtonComp from "../../components/button";
import { createTeacherSchema } from "../../validations/validation";

const TeacherRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: subjectsList = [], loading: subjectsLoading } = useSelector(
    (state) => state.subject
  );
  const { teacherDetails, loading } = useSelector((state) => state.teacher);

  // Fetch subjects
  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: 1, limit: 100 }));
  }, [dispatch]);

  // Fetch teacher if edit mode
  useEffect(() => {
    if (isEdit) {
      dispatch(getTeacherThunk(id));
    }
  }, [dispatch, isEdit, id]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const extractSubjectIds = (subjects) => {
    if (!subjects || !Array.isArray(subjects)) return [];
    return subjects.map((sub) => (typeof sub === "object" ? sub._id : sub));
  };

  // Formik initial values
  const getInitialValues = () => ({
    EmpId: teacherDetails?.EmpId || "",
    firstname: teacherDetails?.firstname || "",
    lastname: teacherDetails?.lastname || "",
    gender: teacherDetails?.gender || "",
    email: teacherDetails?.email || "",
    phoneNumber: teacherDetails?.phoneNumber || "",
    password: "",
    experienceDuration: formatDateForInput(teacherDetails?.experienceDuration) || "",
    experienceDetails: teacherDetails?.experienceDetails || "",
    photoUrl: null,
    experienceCertificate: null,
    identityVerification: null,
    subjects: extractSubjectIds(teacherDetails?.subjects) || [],
    isActive: teacherDetails?.isActive ?? true,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: createTeacherSchema,
    validateOnChange: false,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("gender", values.gender);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("experienceDetails", values.experienceDetails);
      formData.append("isActive", String(values.isActive));
      if (values.EmpId) {
        formData.append("EmpId", Number(values.EmpId));
      }
      if (values.experienceDuration) {
        formData.append("experienceDuration", new Date(values.experienceDuration).toISOString());
      }
      formData.append("email", values.email);
      if (!isEdit) {
        if (values.password) {
          formData.append("password", values.password);
        }
      }
      if (Array.isArray(values.subjects) && values.subjects.length > 0) {
        values.subjects.forEach((subId) => {
          formData.append("subjects[]", subId);
        });
      }
      if (values.photoUrl instanceof File) {
        formData.append("photoUrl", values.photoUrl, values.photoUrl.name);
      }
      if (values.experienceCertificate instanceof File) {
        formData.append(
          "experienceCertificate",
          values.experienceCertificate,
          values.experienceCertificate.name
        );
      }
      if (values.identityVerification instanceof File) {
        formData.append(
          "identityVerification",
          values.identityVerification,
          values.identityVerification.name
        );
      }
      if (isEdit && teacherDetails?._id) {
        await dispatch(updateTeacherThunk({ id: teacherDetails._id, body: formData }))
          .unwrap()
          .then(() => (resetForm(), navigate("/teachers")));
      } else {
        await dispatch(registerTeacherThunk(formData))
          .unwrap()
          .then(() => (resetForm(), navigate("/teachers")));
      }
    },
  });

  const handleFileChange = useCallback(
    (field) => (event) => {
      const file = event.currentTarget.files?.[0] || null;
      formik.setFieldValue(field, file);
    },
    [formik]
  );

  if (isEdit && !teacherDetails) {
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

      <Box maxWidth="700px" mx="auto" mt={4} p={4} boxShadow={3} borderRadius={3} bgcolor="white">
        <Typography variant="h4" mb={2} textAlign="center" color="primary">
          {isEdit ? "Edit Teacher" : "Teacher Registration"}
        </Typography>

        {subjectsLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* PERSONAL INFO */}
            <Box>
              <Typography variant="h6" color="primary">
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField
                fullWidth
                label="First Name"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={!!formik.errors.firstname}
                helperText={formik.errors.firstname}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={!!formik.errors.lastname}
                helperText={formik.errors.lastname}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Employee ID"
                name="EmpId"
                value={formik.values.EmpId}
                onChange={formik.handleChange}
                error={!!formik.errors.EmpId}
                helperText={formik.errors.EmpId}
                sx={{ mb: 2 }}
              />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Gender
              </Typography>
              <RadioGroup
                row
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {formik.errors.gender && (
                <Typography color="error">{formik.errors.gender}</Typography>
              )}
            </Box>

            {/* SUBJECTS */}
            <Box>
              <Typography variant="h6" color="primary">
                Subjects
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControl fullWidth error={!!formik.errors.subjects}>
                <InputLabel id="subjects-label">Select Subjects</InputLabel>
                <Select
                  labelId="subjects-label"
                  multiple
                  value={formik.values.subjects}
                  onChange={(e) => formik.setFieldValue("subjects", e.target.value)}
                  input={<OutlinedInput label="Select Subjects" />}
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
                {formik.errors.subjects && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.subjects}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* CONTACT INFO */}
            <Box>
              <Typography variant="h6" color="primary">
                Contact & Status
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={!!formik.errors.phoneNumber}
                helperText={formik.errors.phoneNumber}
                sx={{ mb: 2 }}
              />
              {!isEdit && (
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                  sx={{ mb: 2 }}
                />
              )}

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="isActive-label">Is Active</InputLabel>
                <Select
                  labelId="isActive-label"
                  name="isActive"
                  value={formik.values.isActive ? "true" : "false"}
                  onChange={(e) => formik.setFieldValue("isActive", e.target.value === "true")}
                  label="Is Active"
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* EXPERIENCE */}
            <Box>
              <Typography variant="h6" color="primary">
                Experience
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField
                fullWidth
                type="date"
                label="Experience Duration"
                name="experienceDuration"
                InputLabelProps={{ shrink: true }}
                value={formik.values.experienceDuration}
                onChange={formik.handleChange}
                error={!!formik.errors.experienceDuration}
                helperText={formik.errors.experienceeDuration}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Experience Details"
                name="experienceDetails"
                value={formik.values.experienceDetails}
                onChange={formik.handleChange}
                error={!!formik.errors.experienceDetails}
                helperText={formik.errors.experienceDetails}
              />
            </Box>

            {/* FILE UPLOADS */}
            <Box>
              <Typography variant="h6" color="primary">
                Upload Documents
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {["photoUrl", "experienceCertificate", "identityVerification"].map((field, idx) => (
                <Box sx={{ mb: 2 }} key={idx}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {field.replace(/([A-Z])/g, " $1").trim()}
                    {isEdit && teacherDetails?.[field] && (
                      <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                        (Existing file - upload new to replace)
                      </Typography>
                    )}
                  </Typography>
                  <input
                    type="file"
                    accept={field === "photoUrl" ? "image/*" : "image/*,application/pdf"}
                    onChange={handleFileChange(field)}
                  />
                  {formik.errors[field] && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {formik.errors[field]}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Registering..."
                : isEdit
                  ? "Update Teacher"
                  : "Register Teacher"}
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default TeacherRegistration;
