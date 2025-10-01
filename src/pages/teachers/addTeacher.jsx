import React from "react";
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
} from "@mui/material";
import { registerTeacher } from "../../services/teacherServices";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  classIncharge: Yup.string().required("Class Incharge is required"),
  experience: Yup.number().min(0, "Experience must be positive").required("Experience is required"),
  photo: Yup.mixed().required("Photo is required"),
  experienceCertificate: Yup.mixed().required("Certificate file is required"),
  experienceDetails: Yup.string().required("Experience details are required"),
  identityVerification: Yup.mixed().required("Aadhar file is required"),
  subject: Yup.string().required("Subject is required"),
});

const TeacherRegistration = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      classIncharge: "",
      experience: "",
      photo: null,
      experienceCertificate: null,
      experienceDetails: "",
      identityVerification: null,
      subject: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await registerTeacher(formData);
      resetForm();
    },
  });

  return (
    <div>
      <Box
        maxWidth="700px"
        mx="auto"
        mt={4}
        p={4}
        boxShadow={3}
        borderRadius={3}
        bgcolor="white"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h4" mb={2} textAlign="center" color="primary">
          Teacher Registration
        </Typography>

        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* Personal Information Section */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="First Name"
                {...formik.getFieldProps("firstName")}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />

              <TextField
                fullWidth
                label="Last Name"
                {...formik.getFieldProps("lastName")}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />

              <div>
                <Typography variant="body1" gutterBottom>
                  Gender
                </Typography>
                <RadioGroup
                  row
                  name="gender"
                  value={formik.values.gender}
                  onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
                {formik.touched.gender && formik.errors.gender && (
                  <Typography color="error" variant="caption">
                    {formik.errors.gender}
                  </Typography>
                )}
              </div>
            </Box>
          </Box>

          {/* Contact & Credentials Section */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact & Credentials
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                label="Phone Number"
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                {...formik.getFieldProps("password")}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextField
                fullWidth
                label="Class Incharge"
                {...formik.getFieldProps("classIncharge")}
                error={formik.touched.classIncharge && Boolean(formik.errors.classIncharge)}
                helperText={formik.touched.classIncharge && formik.errors.classIncharge}
              />

              <TextField
                fullWidth
                type="number"
                label="Experience (Years)"
                {...formik.getFieldProps("experience")}
                error={formik.touched.experience && Boolean(formik.errors.experience)}
                helperText={formik.touched.experience && formik.errors.experience}
              />

              <TextField
                fullWidth
                label="Subject"
                {...formik.getFieldProps("subject")}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Experience Details"
                {...formik.getFieldProps("experienceDetails")}
                error={formik.touched.experienceDetails && Boolean(formik.errors.experienceDetails)}
                helperText={formik.touched.experienceDetails && formik.errors.experienceDetails}
              />
            </Box>
          </Box>

          {/* Documents Upload Section */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Documents Upload
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" flexDirection="column" gap={2}>
              <div>
                <Typography variant="body1" gutterBottom>
                  Upload Photo
                </Typography>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "photo",
                      event.currentTarget.files ? event.currentTarget.files[0] : null
                    );
                  }}
                />
                {formik.touched.photo && formik.errors.photo && (
                  <Typography color="error" variant="caption">
                    {formik.errors.photo}
                  </Typography>
                )}
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  Upload Experience Certificate
                </Typography>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "experienceCertificate",
                      event.currentTarget.files ? event.currentTarget.files[0] : null
                    );
                  }}
                />
                {formik.touched.experienceCertificate && formik.errors.experienceCertificate && (
                  <Typography color="error" variant="caption">
                    {formik.errors.experienceCertificate}
                  </Typography>
                )}
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  Upload Aadhar (Identity Verification)
                </Typography>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "identityVerification",
                      event.currentTarget.files ? event.currentTarget.files[0] : null
                    );
                  }}
                />
                {formik.touched.identityVerification && formik.errors.identityVerification && (
                  <Typography color="error" variant="caption">
                    {formik.errors.identityVerification}
                  </Typography>
                )}
              </div>
            </Box>
          </Box>

          {/* Submit */}
          <Button type="submit" variant="contained" fullWidth>
            Register Teacher
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default TeacherRegistration;
