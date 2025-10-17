import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classListThunk } from "../../features/class/classThunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import { createExamThunk } from "../../features/createExam/createExamThunk";

const CreateExam = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.class);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(classListThunk({ page: 1, limit: 50 }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      class: "",
      section: "",
      subjects: [],
    },

    validationSchema: Yup.object({
      class: Yup.string().required("Class is required"),
      section: Yup.string().required("Section is required"),
      subjects: Yup.array().min(1, "Select at least one subject"),
    }),
    onSubmit: (values) => {
      const payload = {
        classId: values.class,
        sectionId: values.section,
        subjectIds: values.subjects,
      };

      dispatch(createExamThunk(payload));
    },
  });

  useEffect(() => {
    const found = classes.find((cls) => cls._id === formik.values.class);
    setSelectedClass(found || null);

    formik.setFieldValue("sectionId", "");
    formik.setFieldValue("subjectIds", []);
  }, [formik.values.class, classes]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Create Exam
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="class-select-label">Class</InputLabel>
          <Select
            labelId="class-select-label"
            name="class"
            value={formik.values.class}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Class"
            error={formik.touched.class && Boolean(formik.errors.class)}
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                Class {cls.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.class && formik.errors.class && (
            <Typography color="error" variant="caption">
              {formik.errors.class}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedClass}>
          <InputLabel id="section-select-label">Section</InputLabel>
          <Select
            labelId="section-select-label"
            name="section"
            value={formik.values.section}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Section"
            error={formik.touched.section && Boolean(formik.errors.section)}
          >
            {selectedClass?.sections?.map((section) => (
              <MenuItem key={section._id} value={section._id}>
                {section.name || section.sectionName || section.code}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.section && formik.errors.section && (
            <Typography color="error" variant="caption">
              {formik.errors.section}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedClass}>
          <InputLabel id="subject-select-label">Subjects</InputLabel>
          <Select
            labelId="subject-select-label"
            multiple
            name="subjects"
            value={formik.values.subjects}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            input={<OutlinedInput label="Subjects" />}
            renderValue={(selected) =>
              selected
                .map((id) => selectedClass?.subjects?.find((sub) => sub._id === id)?.name)
                .join(", ")
            }
          >
            {selectedClass?.subjects?.map((subject) => (
              <MenuItem key={subject._id} value={subject._id}>
                <Checkbox checked={formik.values.subjects.includes(subject._id)} />
                <ListItemText primary={subject.name} />
              </MenuItem>
            ))}
          </Select>
          {formik.touched.subjects && formik.errors.subjects && (
            <Typography color="error" variant="caption">
              {formik.errors.subjects}
            </Typography>
          )}
        </FormControl>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Exam
        </Button>
      </form>
    </Box>
  );
};

export default CreateExam;
