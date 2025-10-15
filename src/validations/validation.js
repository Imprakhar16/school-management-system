import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  role: Yup.string().required("Role is required"),
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
  name: Yup.string().required("Section Name is required"),
});

export const addClassSchema = Yup.object({
  name: Yup.string().required("Class name is required"),
  subjects: Yup.array().min(1, "Select at least one subject"),
  sections: Yup.array().min(1, "Select at least one section"),
  classincharge: Yup.string().required("Teacher name is requred"),
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
    .when("isEdit", {
      is: false,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  experienceDuration: Yup.date()
    .typeError("Invalid date")
    .required("Experience duration is required"),
  experienceDetails: Yup.string().required("Experience details are required"),
  photoUrl: Yup.mixed().when("isEdit", {
    is: false,
    then: (schema) => schema.required("Photo is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  experienceCertificate: Yup.mixed().when("isEdit", {
    is: false,
    then: (schema) => schema.required("Experience certificate is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  identityVerification: Yup.mixed().when("isEdit", {
    is: false,
    then: (schema) => schema.required("Identity verification document is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  subjects: Yup.array()
    .of(Yup.string())
    .min(1, "At least one subject must be selected")
    .required("Subjects are required"),
});

export const studentSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  parentname: Yup.string().required("Father name is required"),
  email: Yup.string().email("Invalid email"),
  rollNo: Yup.number().required("Roll number is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  class: Yup.string().required("Class is required"),
  section: Yup.string().required("Section is required"),
  phoneNumber: Yup.string()
    .min(10, "Min 10 numbers required")
    .max(10, "Max 10 numbers")
    .required("Contact is required"),
});

export const examTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});
