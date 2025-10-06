import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginPrincipalThunk, loginTeacherThunk } from "../../features/auth/authThunk";
import { loginSchema } from "../../validations/validation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("principal");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTabChange = (newValue) => {
    setUserType(newValue);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (userType === "principal") {
        dispatch(loginPrincipalThunk(values)).then(() => navigate("/"));
      } else if (userType === "teacher") {
        dispatch(loginTeacherThunk(values)).then(() => navigate("/"));
      }
    },
  });

  const userTypes = [
    { value: "principal", label: "Principal" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1100,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <Grid container>
          {/* Left side - illustration */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              position: "relative",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                color: "#1e3a8a",
                zIndex: 1,
              }}
            >
              <Typography variant="h3" fontWeight="700" gutterBottom>
                Welcome to
              </Typography>
              <Typography variant="h3" fontWeight="700" gutterBottom>
                School Management
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
                Streamline your educational institution
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  component="img"
                  src="https://www.astiinfotech.com/wp-content/uploads/2024/02/upper-main-image-2.webp"
                  alt="School Management"
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right side - form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: { xs: 3, sm: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* User type tabs */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mb: 4,
                width: "100%",
                p: 0.5,
                backgroundColor: "#f0f4ff",
                borderRadius: 3,
              }}
            >
              {userTypes.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => handleTabChange(type.value)}
                  sx={{
                    flex: 1,
                    py: 1.2,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    backgroundColor: userType === type.value ? "#1e3a8a" : "transparent",
                    color: userType === type.value ? "#ffffff" : "#64748b",
                    boxShadow:
                      userType === type.value ? "0 2px 8px rgba(30, 58, 138, 0.3)" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: userType === type.value ? "#1e40af" : "#e0e7ff",
                      color: userType === type.value ? "#ffffff" : "#475569",
                    },
                  }}
                >
                  {type.label}
                </Button>
              ))}
            </Box>

            {/* Title */}
            <Typography
              component="h1"
              variant="h4"
              fontWeight="700"
              gutterBottom
              sx={{ color: "#1e3a8a" }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, color: "#64748b" }}>
              Please login to your account
            </Typography>

            {/* Form */}
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
              {/* Email */}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#1e3a8a" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#1e3a8a" },
                    "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#1e3a8a" },
                }}
              />

              {/* Password */}
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#1e3a8a" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "#1e3a8a" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#1e3a8a" },
                    "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#1e3a8a" },
                }}
              />

              {/* Forgot password link */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1.5,
                  mb: 2,
                }}
              >
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  underline="hover"
                  onClick={() => navigate("/forgot-password")}
                  sx={{
                    color: "#1e3a8a",
                    fontWeight: 600,
                    "&:hover": { color: "#1e40af" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* Submit button */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, py: 1.5 }}>
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
