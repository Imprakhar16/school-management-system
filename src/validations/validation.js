import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export const forgotPassSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPassSchema = Yup.object({
  newPassword: Yup.string().min(6, "At least six characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const createSectionSchema = Yup.object({
  sectionId: Yup.string().required("Section ID is required"),
  name: Yup.string().required("Section Name is required"),
});

export const addClassSchema = Yup.object({
  name: Yup.string().required("Class name is required"),
  subjects: Yup.array().min(1, "Select at least one subject"),
  sections: Yup.array().min(1, "Select at least one section"),
  classIncharge: Yup.object().required("Teacher name is requred"),
});

export const createTeacherSchema = Yup.object({
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
    .length(24, "Please select a valid class")
    .required("Class Incharge is required"),
  experienceDuration: Yup.date()
    .typeError("Invalid date")
    .required("Experience duration is required"),
  experienceDetails: Yup.string().required("Experience details are required"),
  photoUrl: Yup.mixed().required("Photo is required"),
  experienceCertificate: Yup.mixed().required("Experience certificate is required"),
  identityVerification: Yup.mixed().required("Identity verification document is required"),
  subjects: Yup.array()
    .of(Yup.string())
    .min(1, "At least one subject must be selected")
    .required("Subjects are required"),
});
