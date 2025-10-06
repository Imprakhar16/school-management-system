import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Email } from "@mui/icons-material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { forgotPasswordThunk } from "../../features/auth/authThunk";
import { forgotPassSchema } from "../../validations/validation";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordThunk(values));
    },
  });

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
            Forgot Password
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
            Enter your registered email address and we’ll send you a link to reset your password.
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
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
              Send Reset Link
            </Button>
            <Button
              type="submit"
              fullWidth
              sx={{ mb: 2, py: 1.5, border: "1px solid" }}
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
