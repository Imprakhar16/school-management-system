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
import { loginThunk } from "../../features/auth/authThunk";
import { loginSchema } from "../../validations/validation";
import ButtonComp from "../../components/button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values)).then(() => navigate("/"));
    },
  });

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

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
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

              <ButtonComp
                title="Sign In"
                type="submit"
                fullwidth={true}
                variant="contained"
                sx={{
                  backgroundColor: "#1e3a8a",
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#1e40af" },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
