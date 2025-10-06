import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { resetPasswordThunk } from "../../features/auth/authThunk";
import { useParams } from "react-router-dom";
import { resetPassSchema } from "../../validations/validation";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPassSchema,
    onSubmit: (values) => {
      dispatch(resetPasswordThunk({ token, newPassword: values.newPassword }));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e3a8a" }}
          >
            Reset Password
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center", color: "#64748b" }}
          >
            Enter your new password below.
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              id="newPassword"
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              autoComplete="new-password"
              autoFocus
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              InputProps={{
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
            />

            <TextField
              margin="normal"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 2.5,
                backgroundColor: "#1e3a8a",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
                "&:hover": {
                  backgroundColor: "#1e40af",
                  boxShadow: "0 6px 16px rgba(30, 58, 138, 0.4)",
                },
              }}
            >
              Save Password
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
