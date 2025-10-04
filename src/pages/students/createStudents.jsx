import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const genderOptions = ["Male", "Female", "Other"];
const categoryOptions = ["General", "OBC", "SC", "ST", "Other"];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  fatherName: Yup.string().required("Father name is required"),
  motherName: Yup.string().required("Mother name is required"),
  email: Yup.string().email("Invalid email"),
  fatherEmail: Yup.string().email("Invalid email").required("Father's email is required"),
  motherEmail: Yup.string().email("Invalid email"),
  rollNumber: Yup.string().required("Roll number is required"),
  gender: Yup.string().required("Gender is required"),
  category: Yup.string().required("Category is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  enrollmentNumber: Yup.string().required("Enrollment number is required"),
  class: Yup.string().required("Class is required"),
  section: Yup.string().required("Section is required"),
  studentContact: Yup.string(),
  fatherContact: Yup.string().required("Father's contact is required"),
  motherContact: Yup.string(),
});

const StudentForm = () => {
  const [aadharFile, setAadharFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [certificatesFiles, setCertificatesFiles] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      email: "",
      fatherEmail: "",
      motherEmail: "",
      rollNumber: "",
      gender: "",
      category: "",
      address: "",
      password: "",
      enrollmentNumber: "",
      class: "",
      section: "",
      studentContact: "",
      fatherContact: "",
      motherContact: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitting:", {
        ...values,
        aadhar: aadharFile,
        photo: photoFile,
        certificates: certificatesFiles,
      });
      alert("Form submitted successfully! Check console for data.");
    },
  });

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: "#d32f2f",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#424242",
  };

  const errorStyle = {
    color: "#d32f2f",
    fontSize: "12px",
    marginTop: "4px",
    display: "block",
  };

  const fileInputStyle = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px dashed #e0e0e0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#667eea",
            padding: "40px 30px",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: "0 0 10px 0",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            Student Registration
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              opacity: 0.9,
            }}
          >
            Fill in the details below to register a new student
          </p>
        </div>

        <div style={{ padding: "40px 30px" }} onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#667eea",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                Personal Information
              </h2>
            </div>

            <div>
              <label style={labelStyle}>
                First Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter first name"
                style={
                  formik.touched.firstName && formik.errors.firstName ? errorInputStyle : inputStyle
                }
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span style={errorStyle}>{formik.errors.firstName}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Last Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter last name"
                style={
                  formik.touched.lastName && formik.errors.lastName ? errorInputStyle : inputStyle
                }
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span style={errorStyle}>{formik.errors.lastName}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Gender <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={formik.touched.gender && formik.errors.gender ? errorInputStyle : inputStyle}
              >
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <span style={errorStyle}>{formik.errors.gender}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Category <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={
                  formik.touched.category && formik.errors.category ? errorInputStyle : inputStyle
                }
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <span style={errorStyle}>{formik.errors.category}</span>
              )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                Address <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <textarea
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter complete address"
                rows="3"
                style={{
                  ...(formik.touched.address && formik.errors.address
                    ? errorInputStyle
                    : inputStyle),
                  resize: "vertical",
                }}
              />
              {formik.touched.address && formik.errors.address && (
                <span style={errorStyle}>{formik.errors.address}</span>
              )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#667eea",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                Parent Information
              </h2>
            </div>

            <div>
              <label style={labelStyle}>
                Father's Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formik.values.fatherName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter father's name"
                style={
                  formik.touched.fatherName && formik.errors.fatherName
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.fatherName && formik.errors.fatherName && (
                <span style={errorStyle}>{formik.errors.fatherName}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Mother's Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="motherName"
                value={formik.values.motherName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter mother's name"
                style={
                  formik.touched.motherName && formik.errors.motherName
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.motherName && formik.errors.motherName && (
                <span style={errorStyle}>{formik.errors.motherName}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Father's Email <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="email"
                name="fatherEmail"
                value={formik.values.fatherEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="father@example.com"
                style={
                  formik.touched.fatherEmail && formik.errors.fatherEmail
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.fatherEmail && formik.errors.fatherEmail && (
                <span style={errorStyle}>{formik.errors.fatherEmail}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>Mother's Email</label>
              <input
                type="email"
                name="motherEmail"
                value={formik.values.motherEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="mother@example.com"
                style={
                  formik.touched.motherEmail && formik.errors.motherEmail
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.motherEmail && formik.errors.motherEmail && (
                <span style={errorStyle}>{formik.errors.motherEmail}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Father's Contact <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="tel"
                name="fatherContact"
                value={formik.values.fatherContact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="+91 XXXXXXXXXX"
                style={
                  formik.touched.fatherContact && formik.errors.fatherContact
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.fatherContact && formik.errors.fatherContact && (
                <span style={errorStyle}>{formik.errors.fatherContact}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>Mother's Contact</label>
              <input
                type="tel"
                name="motherContact"
                value={formik.values.motherContact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="+91 XXXXXXXXXX"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#667eea",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                Academic Information
              </h2>
            </div>

            <div>
              <label style={labelStyle}>
                Roll Number <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="rollNumber"
                value={formik.values.rollNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter roll number"
                style={
                  formik.touched.rollNumber && formik.errors.rollNumber
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.rollNumber && formik.errors.rollNumber && (
                <span style={errorStyle}>{formik.errors.rollNumber}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Enrollment Number <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="enrollmentNumber"
                value={formik.values.enrollmentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter enrollment number"
                style={
                  formik.touched.enrollmentNumber && formik.errors.enrollmentNumber
                    ? errorInputStyle
                    : inputStyle
                }
              />
              {formik.touched.enrollmentNumber && formik.errors.enrollmentNumber && (
                <span style={errorStyle}>{formik.errors.enrollmentNumber}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Class <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="class"
                value={formik.values.class}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., 10th, 12th"
                style={formik.touched.class && formik.errors.class ? errorInputStyle : inputStyle}
              />
              {formik.touched.class && formik.errors.class && (
                <span style={errorStyle}>{formik.errors.class}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Section <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="section"
                value={formik.values.section}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., A, B, C"
                style={
                  formik.touched.section && formik.errors.section ? errorInputStyle : inputStyle
                }
              />
              {formik.touched.section && formik.errors.section && (
                <span style={errorStyle}>{formik.errors.section}</span>
              )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#667eea",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                Contact & Credentials
              </h2>
            </div>

            <div>
              <label style={labelStyle}>Student Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="student@example.com"
                style={formik.touched.email && formik.errors.email ? errorInputStyle : inputStyle}
              />
              {formik.touched.email && formik.errors.email && (
                <span style={errorStyle}>{formik.errors.email}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>Student Contact</label>
              <input
                type="tel"
                name="studentContact"
                value={formik.values.studentContact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="+91 XXXXXXXXXX"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                Password <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Minimum 6 characters"
                style={
                  formik.touched.password && formik.errors.password ? errorInputStyle : inputStyle
                }
              />
              {formik.touched.password && formik.errors.password && (
                <span style={errorStyle}>{formik.errors.password}</span>
              )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#667eea",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                Documents Upload
              </h2>
            </div>

            <div>
              <label style={labelStyle}>
                Aadhar Card (PDF/Image) <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setAadharFile(e.target.files[0])}
                style={fileInputStyle}
              />
              {aadharFile && (
                <span
                  style={{ fontSize: "12px", color: "#4caf50", marginTop: "4px", display: "block" }}
                >
                  ✓ {aadharFile.name}
                </span>
              )}
            </div>

            <div>
              <label style={labelStyle}>
                Student Photo <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                style={fileInputStyle}
              />
              {photoFile && (
                <span
                  style={{ fontSize: "12px", color: "#4caf50", marginTop: "4px", display: "block" }}
                >
                  ✓ {photoFile.name}
                </span>
              )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Certificates (Optional)</label>
              <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={(e) => setCertificatesFiles(e.target.files)}
                style={fileInputStyle}
              />
              {certificatesFiles && (
                <span
                  style={{ fontSize: "12px", color: "#4caf50", marginTop: "4px", display: "block" }}
                >
                  ✓ {certificatesFiles.length} file(s) selected
                </span>
              )}
            </div>

            <div style={{ gridColumn: "1 / -1", marginTop: "30px" }}>
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                  backgroundColor: "#667eea",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                }}
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
