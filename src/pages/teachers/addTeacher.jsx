import React, { useEffect, useCallback } from "react";
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
import { registerTeacher } from "../../services/teacherServices";
import { fetchAllSubjectsThunk } from "../../features/subjects/subjectThunk";
import { fetchSectionsThunk } from "../../features/section/sectionThunk";

// ✅ Validation Schema
const validationSchema = Yup.object({
  EmpId: Yup.number().typeError("Employee ID must be a number").required("Employee ID is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  classincharge: Yup.string()
    .length(24, "Please select a valid section")
    .required("Class Incharge is required"),
  experienceDuration: Yup.date()
    .typeError("Invalid date")
    .required("Experience duration is required"),
  experienceDetails: Yup.string().required("Experience details are required"),
  photo: Yup.mixed().required("Photo is required"),
  experienceCertificate: Yup.mixed().required("Experience certificate is required"),
  identityVerification: Yup.mixed().required("Identity verification document is required"),
  subjects: Yup.array()
    .of(Yup.string())
    .min(1, "At least one subject must be selected")
    .required("Subjects are required"),
});

const TeacherRegistration = () => {
  const dispatch = useDispatch();

  // Redux data
  const { data: subjectsList = [], loading: subjectsLoading } = useSelector(
    (state) => state.subject
  );
  const { sections: sectionsList = [], loading: sectionsLoading } = useSelector(
    (state) => state.sections
  );

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          dispatch(fetchAllSubjectsThunk({ page: 1, limit: 100 })),
          dispatch(fetchSectionsThunk({ page: 1, limit: 100 })),
        ]);
      } catch (err) {
        console.error("Error fetching subjects/sections:", err);
      }
    })();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      EmpId: "",
      firstname: "",
      lastname: "",
      gender: "",
      email: "",
      phoneNumber: "",
      password: "",
      classincharge: "",
      experienceDuration: "",
      experienceDetails: "",
      photo: null,
      experienceCertificate: null,
      identityVerification: null,
      subjects: [],
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
          if (key === "subjects" && Array.isArray(val)) {
            val.forEach((subId) => formData.append("subjects", subId));
          } else if (
            key === "photo" ||
            key === "experienceCertificate" ||
            key === "identityVerification"
          ) {
            if (val) formData.append(key, val, val.name);
          } else if (key === "EmpId") {
            formData.append("EmpId", Number(val));
          } else if (key === "experienceDuration") {
            formData.append("experienceDuration", new Date(val).toISOString());
          } else if (key === "classincharge" && val) {
            formData.append(key, val);
          } else if (key !== "classincharge") {
            formData.append(key, val);
          }
        });

        const response = await registerTeacher(formData);
        console.log("✅ Registration successful:", response);
        alert("Teacher registered successfully!");
        resetForm();
      } catch (error) {
        console.error("❌ Error registering teacher:", error);
        alert(error?.response?.data?.message || "Failed to register teacher");
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

  const isLoading = subjectsLoading || sectionsLoading;

  return (
    <Box maxWidth="700px" mx="auto" mt={4} p={4} boxShadow={3} borderRadius={3} bgcolor="white">
      <Typography variant="h4" mb={2} textAlign="center" color="primary">
        Teacher Registration
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
          {/* Personal Info */}
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
            {formik.errors.gender && <Typography color="error">{formik.errors.gender}</Typography>}
          </Box>

          {/* Subjects */}
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

          {/* Contact & Class */}
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
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth error={!!formik.errors.classincharge}>
              <InputLabel id="classincharge-label">Class Incharge</InputLabel>
              <Select
                labelId="classincharge-label"
                value={formik.values.classincharge}
                onChange={(e) => formik.setFieldValue("classincharge", e.target.value)}
                label="Class Incharge"
              >
                {sectionsList.map((sec) => (
                  <MenuItem key={sec._id} value={sec._id}>
                    {sec.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.classincharge && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {formik.errors.classincharge}
                </Typography>
              )}
            </FormControl>
          </Box>

          {/* Experience */}
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

          {/* File Uploads */}
          <Box>
            <Typography variant="h6" color="primary">
              Upload Documents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Photo *
              </Typography>
              <input type="file" accept="image/*" onChange={handleFileChange("photo")} />
              {formik.errors.photo && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {formik.errors.photo}
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Experience Certificate *
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
                Identity Verification *
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
            Register Teacher
          </Button>
        </form>
      )}
    </Box>
  );
};

export default TeacherRegistration;
