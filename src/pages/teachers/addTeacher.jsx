import React, { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { registerTeacherThunk, updateTeacherThunk } from "../../features/teachers/teacherThunk";
import ButtonComp from "../../components/button";

import { createTeacherSchema } from "../../validations/validation";

const TeacherRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get teacher data from navigation state
  const teacherData = location.state?.teacherData;
  const isEdit = location.state?.isEdit || false;

  const { data: subjectsList = [], loading: subjectsLoading } = useSelector(
    (state) => state.subject
  );
  const { loading } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: 1, limit: 100 }));
  }, [dispatch]);

  // Helper function to format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Helper function to extract IDs from subjects
  const extractSubjectIds = (subjects) => {
    if (!subjects || !Array.isArray(subjects)) return [];
    return subjects.map((sub) => (typeof sub === "object" ? sub._id : sub));
  };

  const formik = useFormik({
    initialValues: {
      EmpId: teacherData?.EmpId || "",
      firstname: teacherData?.firstname || "",
      lastname: teacherData?.lastname || "",
      gender: teacherData?.gender || "",
      email: teacherData?.email || "",
      phoneNumber: teacherData?.phoneNumber || "",
      password: "",
      // classincharge: extractClassId(teacherData?.classincharge) || "",
      experienceDuration: formatDateForInput(teacherData?.experienceDuration) || "",
      experienceDetails: teacherData?.experienceDetails || "",
      photoUrl: null,
      experienceCertificate: null,
      identityVerification: null,
      subjects: extractSubjectIds(teacherData?.subjects) || [],
      isEdit: isEdit,
    },
    validationSchema: createTeacherSchema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, val]) => {
        if (key === "isEdit") {
          return;
        } else if (key === "subjects" && Array.isArray(val)) {
          val.forEach((subId) => formData.append("subjects[]", subId));
        } else if (
          key === "photoUrl" ||
          key === "experienceCertificate" ||
          key === "identityVerification"
        ) {
          // Only append files if they are newly selected
          if (val) formData.append(key, val, val.name);
        } else if (key === "EmpId") {
          formData.append("EmpId", Number(val));
        } else if (key === "experienceDuration") {
          formData.append("experienceDuration", new Date(val).toISOString());
        } else if (key === "password") {
          // Only include password if it's filled
          if (val) formData.append(key, val);
        } else if (key === "classincharge" && val) {
          formData.append(key, val);
        } else if (key !== "classincharge") {
          formData.append(key, val);
        }
      });

      if (isEdit && teacherData?._id) {
        // Use updateTeacherThunk for editing
        await dispatch(
          updateTeacherThunk({
            id: teacherData._id,
            body: formData,
          })
        )
          .unwrap()
          .then(() => (resetForm(), navigate("/teachers")));
      } else {
        // Use registerTeacherThunk for creating new teacher
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

  const isLoading = loading || subjectsLoading;

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

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <Box>
              <Typography variant="h6" color="primary">
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
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

            <Box>
              <Typography variant="h6" color="primary">
                Contact & Class
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
              <TextField
                fullWidth
                label={isEdit ? "Password (required)" : "Password"}
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                sx={{ mb: 2 }}
              />
            </Box>

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
                helperText={formik.errors.experienceDuration}
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

            <Box>
              <Typography variant="h6" color="primary">
                Upload Documents
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Photo {!isEdit && "*"}
                  {isEdit && teacherData?.photoUrl && (
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                      (Current file exists - upload new to replace)
                    </Typography>
                  )}
                </Typography>
                <input type="file" accept="image/*" onChange={handleFileChange("photoUrl")} />
                {formik.errors.photoUrl && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.photoUrl}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Experience Certificate {!isEdit && "*"}
                  {isEdit && teacherData?.experienceCertificate && (
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                      (Current file exists - upload new to replace)
                    </Typography>
                  )}
                </Typography>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange("experienceCertificate")}
                />
                {formik.errors.experienceCertificate && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.experienceCertificate}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Identity Verification {!isEdit && "*"}
                  {isEdit && teacherData?.identityVerification && (
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                      (Current file exists - upload new to replace)
                    </Typography>
                  )}
                </Typography>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange("identityVerification")}
                />
                {formik.errors.identityVerification && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.identityVerification}
                  </Typography>
                )}
              </Box>
            </Box>

            <Button variant="contained" type="submit" color="primary" size="large">
              {isEdit ? "Update Teacher" : "Register Teacher"}
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default TeacherRegistration;
