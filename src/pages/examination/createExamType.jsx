import { useFormik } from "formik";
import {
  Box,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { examTypeSchema } from "../../validations/validation";
import { createExamTypeThunk, updateExamTypeThunk } from "../../features/examType/examTypeThunk";
import ButtonComp from "../../components/button";
import { pageBack } from "../../constants/constantsUI";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/toaster";

export default function CreateExamType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const examTypeData = location.state?.examTypeData;

  const formik = useFormik({
    initialValues: {
      name: examTypeData?.name || "",
      isActive: examTypeData?.isActive ?? true,
    },
    validationSchema: examTypeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,

    onSubmit: (values, { setSubmitting }) => {
      const action = examTypeData
        ? updateExamTypeThunk({ id: examTypeData._id, update: values })
        : createExamTypeThunk(values);

      dispatch(action)
        .unwrap()
        .then(() => {
          showToast({
            status: "success",
            message: examTypeData
              ? "Update Exam Type Successfully"
              : "Exam Type created successfully",
          });
          navigate("/exam-type");
        })
        .finally(() => setSubmitting(false));
    },
  });
  const type = ["Monthly", "Quaterly", "Half-Yearly", "Annual"];

  return (
    <>
      <ButtonComp
        title={pageBack}
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/exam-type")}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create Exam Types
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
            <InputLabel id="examType-label">Exam Type</InputLabel>
            <Select
              labelId="examType-label"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              input={<OutlinedInput label="Exam Type" />}
            >
              {type.map((t, i) => (
                <MenuItem key={i} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.name && formik.errors.name && (
              <Typography color="error" variant="caption">
                {formik.errors.name}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="examType-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="isActive"
              name="isActive"
              value={formik.values.isActive.toString()}
              onChange={(e) => formik.setFieldValue("isActive", e.target.value === "true")}
              input={<OutlinedInput label="Status" />}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
            {formik.touched.isActive && formik.errors.isActive && (
              <Typography color="error" variant="caption">
                {formik.errors.isActive}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <ButtonComp
              title={
                formik.isSubmitting ? (
                  <CircularProgress size={24} />
                ) : examTypeData ? (
                  "Update Exam Type"
                ) : (
                  "Create Type"
                )
              }
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
            />
          </Box>
        </form>
      </Box>
    </>
  );
}
