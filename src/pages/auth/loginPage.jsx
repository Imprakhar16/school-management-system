import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../features/auth/authThunk";
import { loginSchema } from "../../validations/validation";
import ButtonComp from "../../components/button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions = ["principal", "teacher", "student"];

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "principal",
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
              padding: { xs: 3, sm: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "100%",
              mt: { md: 6, xs: 2 },
            }}
          >
            <Typography variant="h3" fontWeight="700" color="#1e3a8a" gutterBottom>
              Welcome to
            </Typography>
            <Typography variant="h3" fontWeight="700" color="#1e3a8a" gutterBottom>
              School Management
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, color: "#475569" }}>
              Streamline your educational institution
            </Typography>
            <Box
              component="img"
              src="https://www.astiinfotech.com/wp-content/uploads/2024/02/upper-main-image-2.webp"
              alt="School Management"
              sx={{
                width: "100%",
                maxWidth: 400,
                mt: 4,
                filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: { xs: 3, sm: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "100%",
              mt: { md: 6, xs: 2 },
            }}
          >
            {/* Role Boxes */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mb: 4,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              {roleOptions.map((role) => (
                <Paper
                  key={role}
                  elevation={3}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: 600,
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    background:
                      formik.values.role === role.toLowerCase()
                        ? "linear-gradient(135deg, #1e3a8a, #3b82f6)"
                        : "#f8fafc",
                    color: formik.values.role === role.toLowerCase() ? "#fff" : "#1e3a8a",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                      color: "#fff",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 20px rgba(30,58,138,0.3)",
                    },
                  }}
                  onClick={() => formik.setFieldValue("role", role.toLowerCase())}
                >
                  {role}
                </Paper>
              ))}
            </Box>
            <Box sx={{ width: "100%", maxWidth: 420 }}>
              <Typography variant="h4" fontWeight="700" color="#1e3a8a" gutterBottom>
                Welcome Back 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
                Please login to your account
              </Typography>

              <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
                {/* Email */}
                <TextField
                  fullWidth
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                  fullWidth
                  margin="normal"
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#1e3a8a" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} sx={{ color: "#1e3a8a" }}>
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

                {/* Role Dropdown */}
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="role-label">Select Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    input={
                      <OutlinedInput
                        label="Select Role"
                        startAdornment={
                          <InputAdornment position="start">
                            <Person sx={{ color: "#1e3a8a" }} />
                          </InputAdornment>
                        }
                      />
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "#1e3a8a" },
                        "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#1e3a8a" },
                    }}
                  >
                    {roleOptions.map((role, index) => (
                      <MenuItem key={index} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <Typography color="error" variant="caption">
                      {formik.errors.role}
                    </Typography>
                  )}
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                  <Link
                    component="button"
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
                  title={loading ? "Signing in..." : "Sign In"}
                  type="submit"
                  fullwidth={true}
                  disabled={loading}
                  sx={{
                    backgroundColor: "#1e3a8a",
                    mt: 3,
                    py: 1.5,
                    color: "#fff",
                    "&:hover": { backgroundColor: "#1e40af" },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(30,58,138,0.6)",
                      color: "#fff",
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
