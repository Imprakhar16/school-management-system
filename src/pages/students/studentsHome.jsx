import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, TextField, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchStudentThunk } from "../../features/students/studentsThunk";
import ButtonComp from "../../components/button";
import TableComponent from "../../components/table";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import ReusableModal from "../../components/modal"; // ✅ import your modal

const StudentsHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false); // ✅ modal open state
  const [selectedStudent, setSelectedStudent] = useState(null); // ✅ store selected student

  const [search, setSearch] = useState({
    rollNo: "",
    firstname: "",
    lastname: "",
    parentname: "",
    class: "",
  });

  const { students, loading, totalPages, totalStudents } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const columns = [
    { field: "rollNo", headerName: "ROLLNO" },
    { field: "firstname", headerName: "FIRSTNAME" },
    { field: "lastname", headerName: "LASTNAME" },
    { field: "parentname", headerName: "PARENTNAME" },
    {
      field: "class",
      headerName: "CLASS",
      render: (row) => (row.class?.name ? `${row.class.name}` : "N/A"),
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value.toLowerCase(),
    });
  };

  const filteredData = students?.filter(
    (s) =>
      String(s.rollNo)?.includes(search.rollNo) &&
      s.firstname?.toLowerCase().includes(search.firstname) &&
      s.lastname?.toLowerCase().includes(search.lastname) &&
      s.parentname?.toLowerCase().includes(search.parentname) &&
      String(s.class?.name)?.includes(search.class)
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchStudentThunk(newPage, limit));
  };

  // ✅ when user clicks "Details"
  const handleDetailsClick = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Students List
        </Typography>
        <ButtonComp
          title="Create Students"
          variant="contained"
          color="primary"
          onClick={() => navigate("/create-student")}
          startIcon={<AddIcon />}
        />
      </Box>

      <TableComponent
        columns={columns}
        data={filteredData}
        loading={loading}
        filterRow={{
          rollNo: (
            <TextField
              placeholder="Search Roll No."
              name="rollNo"
              value={search.rollNo}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          firstname: (
            <TextField
              placeholder="Search FirstName"
              name="firstname"
              value={search.firstname}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          lastname: (
            <TextField
              placeholder="Search LastName"
              name="lastname"
              value={search.lastname}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          parentname: (
            <TextField
              placeholder="Search ParentName"
              name="parentname"
              value={search.parentname}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          class: (
            <TextField
              placeholder="Search Class"
              name="class"
              value={search.class}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
        }}
        customRowActions={(row) => (
          <>
            <ButtonComp
              title="Details"
              variant="contained"
              color="primary"
              onClick={() => handleDetailsClick(row)}
            />
          </>
        )}
      />

      <Pagination
        page={page}
        limit={limit}
        setLimit={setLimit}
        onPageChange={handlePageChange}
        totalPage={totalPages}
        total={totalStudents}
      />

      {/* ✅ Modal for details */}
      <ReusableModal open={open} onClose={handleCloseModal} title="Student Details">
        {selectedStudent ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              gap: 3,
              p: 2,
            }}
          >
            {/* Left side - Student Photo */}
            <Box
              sx={{
                flex: "0 0 200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                src={
                  selectedStudent.photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="student"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1976d2",
                }}
              />
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                {selectedStudent.firstname} {selectedStudent.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Roll No: {selectedStudent.rollNo}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  bgcolor: "#e3f2fd",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  mt: 0.5,
                }}
              >
                {selectedStudent.class?.name || "N/A"}{" "}
                {selectedStudent.section?.name ? `(${selectedStudent.section?.name})` : ""}
              </Typography>
            </Box>

            {/* Right side - Student Info */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  borderBottom: "2px solid #1976d2",
                  pb: 0.5,
                  mb: 1.5,
                }}
              >
                Personal Details
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 1,
                }}
              >
                <Typography>
                  <strong>Gender:</strong> {selectedStudent.gender}
                </Typography>
                <Typography>
                  <strong>Parent Name:</strong> {selectedStudent.parentname}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedStudent.email || "N/A"}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {selectedStudent.phoneNumber || "N/A"}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {selectedStudent.address || "N/A"}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  borderBottom: "2px solid #1976d2",
                  pb: 0.5,
                  mb: 1.5,
                }}
              >
                Documents
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {selectedStudent.identityVerification ? (
                  <Typography>
                    <strong>Aadhar / ID Proof:</strong>{" "}
                    <a
                      href={selectedStudent.identityVerification}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "none" }}
                    >
                      View Document
                    </a>
                  </Typography>
                ) : (
                  <Typography color="text.secondary">No ID Proof Uploaded</Typography>
                )}
              </Box>
              <Box sx={{ mt: 3, display: "flex", columnGap: 3 }}>
                <ButtonComp title="Edit" variant="contained" />
                <ButtonComp title="Delete" variant="contained" color="error" />
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography>No data available</Typography>
        )}
      </ReusableModal>
    </Paper>
  );
};

export default StudentsHome;
