import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../components/toaster";
import { createStudentThunk } from "../../features/students/studentsThunk";
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
  FormHelperText,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { classListThunk } from "../../features/class/classThunk";

const genderOptions = ["male", "female", "other"];

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  parentname: Yup.string().required("Father name is required"),
  email: Yup.string().email("Invalid email"),
  rollNo: Yup.string().required("Roll number is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  class: Yup.string().required("Class is required"),
  section: Yup.string().required("Section is required"),
  phoneNumber: Yup.string()
    .min(10, "Min 10 characters required")
    .max(10, "Max 10 numbers")
    .required("Contact is required"),
});

const StudentForm = () => {
  const [aadharFile, setAadharFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const { classes } = useSelector((state) => state.class);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(classListThunk({ page: 1, limit: 100 }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      parentname: "",
      email: "",
      rollNo: "",
      gender: "",
      password: "",
      class: "",
      section: "",
      phoneNumber: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      if (photoFile) formData.append("photoUrl", photoFile);
      if (aadharFile) formData.append("identityVerification", aadharFile);

      dispatch(createStudentThunk(formData))
        .unwrap()
        .then(() => {
          showToast({
            status: "success",
            message: "Student created successfully!",
          });
        });
      resetForm();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        py: 5,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            py: 5,
            px: 3,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Student Registration
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Fill in the details below to register a new student
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Personal Information */}
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Gender <span style={{ color: "#d32f2f" }}>*</span>
                </Typography>
                <RadioGroup
                  row
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  {genderOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {formik.touched.gender && formik.errors.gender && (
                  <Typography color="error" variant="caption">
                    {formik.errors.gender}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Parent Information */}
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Parent Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="Parent's Name"
                  name="parentname"
                  placeholder="Enter father's name"
                  value={formik.values.parentname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.parentname && Boolean(formik.errors.parentname)}
                  helperText={formik.touched.parentname && formik.errors.parentname}
                />

                <TextField
                  fullWidth
                  label="Contact No."
                  name="phoneNumber"
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  inputProps={{
                    maxLength: 10, // <-- this prevents typing more than 10 characters
                    inputMode: "numeric", // optional: shows numeric keyboard on mobile
                  }}
                />
              </Box>
            </Box>

            {/* Academic Information */}
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Academic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Roll Number"
                  name="rollNo"
                  placeholder="Enter roll number"
                  value={formik.values.rollNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.rollNo && Boolean(formik.errors.rollNo)}
                  helperText={formik.touched.rollNo && formik.errors.rollNo}
                />

                {/* Class */}
                <TextField
                  fullWidth
                  select
                  label="Class"
                  name="class"
                  value={formik.values.class}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.class && Boolean(formik.errors.class)}
                  helperText={formik.touched.class && formik.errors.class}
                >
                  {classes.map((s) => (
                    <MenuItem key={s._id} value={s._id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Section */}
                <TextField
                  fullWidth
                  select
                  label="Section"
                  name="section"
                  value={formik.values.section}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.section && Boolean(formik.errors.section)}
                  helperText={formik.touched.section && formik.errors.section}
                >
                  {classes
                    .find((c) => c._id === formik.values.class)
                    ?.sections.map((sec) => (
                      <MenuItem key={sec._id} value={sec._id}>
                        {sec.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            </Box>

            {/* Credentials */}
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Credentials
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="Student Email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Box>
            </Box>

            {/* Documents Upload */}
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Documents Upload
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4 }}
              >
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Aadhar Card (PDF/Image) <span style={{ color: "#d32f2f" }}>*</span>
                  </Typography>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    name="identityVerification"
                    onChange={(e) => setAadharFile(e.target.files[0])}
                    style={{
                      width: "96%",
                      padding: "12px",
                      border: "2px dashed #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: "#fafafa",
                    }}
                  />
                  {aadharFile && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ mt: 1, display: "block" }}
                    >
                      ✓ {aadharFile.name}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Student Photo <span style={{ color: "#d32f2f" }}>*</span>
                  </Typography>
                  <input
                    type="file"
                    name="photoUrl"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
                    style={{
                      width: "93%",
                      padding: "12px",
                      border: "2px dashed #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: "#fafafa",
                    }}
                  />
                  {photoFile && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ mt: 1, display: "block" }}
                    >
                      ✓ {photoFile.name}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 2,
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  boxShadow: "0 6px '20px rgba(102, 126, 234, 0.6)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Submit Registration
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentForm;
