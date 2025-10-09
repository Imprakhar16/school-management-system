import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Grid, Avatar, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TableComponent from "../../components/table";
import SearchInput from "../../components/searchInput";
import { fetchAllTeachersThunk, deleteTeacherThunk } from "../../features/teachers/teacherThunk";
import ButtonComp from "../../components/button";
import Pagination from "../../components/pagination";
import ReusableModal from "../../components/modal";

const TeachersList = () => {
  const dispatch = useDispatch();
  const { teachers, pagination, meta, loading } = useSelector((state) => state.teacher || {});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchSubjects, setSearchSubjects] = useState("");
  const [searchClassIncharge, setSearchClassIncharge] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const filteredData = useMemo(() => {
    if (!teachers) return [];
    return teachers.filter((teacher) => {
      const match = (field, search) => field?.toLowerCase().includes(search.toLowerCase()) ?? false;
      const subjectsText = teacher?.subjects?.map((s) => s.name).join(", ") || "";
      const classInchargeText = teacher?.classincharge?.name || "";
      return (
        match(teacher.firstname, searchFirstName) &&
        match(teacher.lastname, searchLastName) &&
        match(teacher.email, searchEmail) &&
        match(subjectsText, searchSubjects) &&
        match(classInchargeText, searchClassIncharge)
      );
    });
  }, [teachers, searchFirstName, searchLastName, searchEmail, searchSubjects, searchClassIncharge]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchAllTeachersThunk(newPage, rowsPerPage));
  };

  const handleOpenModal = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setOpenModal(false);
  };

  const handleEdit = () => {
    // Navigate to the registration form with teacher data in state
    navigate("/registerTeacher", {
      state: {
        teacherData: selectedTeacher,
        isEdit: true,
      },
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTeacherThunk(id))
      .unwrap()
      .then(() => {
        dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
        setOpenModal(false);
      });
  };

  const columns = [
    {
      field: "slno",
      headerName: "Sl. No.",
      render: (row) => row.slno,
    },
    {
      field: "firstname",
      headerName: (
        <Box>
          <Typography variant="subtitle2">First Name</Typography>
          <SearchInput
            value={searchFirstName}
            onChange={setSearchFirstName}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.firstname,
    },
    {
      field: "lastname",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Last Name</Typography>
          <SearchInput
            value={searchLastName}
            onChange={setSearchLastName}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.lastname,
    },
    {
      field: "email",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Email</Typography>
          <SearchInput
            value={searchEmail}
            onChange={setSearchEmail}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.email,
    },
    {
      field: "subjects",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Subjects</Typography>
          <SearchInput
            value={searchSubjects}
            onChange={setSearchSubjects}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.subjects?.map((s) => `${s.name} (${s.code})`).join(", ") || "-",
    },
    {
      field: "classincharge",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Class Incharge</Typography>
          <SearchInput
            value={searchClassIncharge}
            onChange={setSearchClassIncharge}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.classincharge?.name || "-",
    },
  ];

  const customRowActions = (row) => (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
        onClick={() => handleOpenModal(row)}
      >
        View Details
      </Button>
    </>
  );

  const dataWithSlno = filteredData.map((row, index) => ({
    ...row,
    slno: (page - 1) * rowsPerPage + (index + 1),
  }));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Teachers List
        </Typography>
        <Link to="/registerTeacher">
          <ButtonComp
            title="Add Teacher"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          />
        </Link>
      </Box>

      <TableComponent
        columns={columns}
        data={dataWithSlno}
        loading={loading}
        totalCount={meta?.totalTeachers || 0}
        customRowActions={customRowActions}
        emptyMessage="No teachers found."
      />

      <Pagination
        page={page}
        limit={rowsPerPage}
        setLimit={setRowsPerPage}
        onPageChange={handlePageChange}
        totalPage={pagination?.totalPages || 1}
        total={pagination?.total}
      />
      {/* 🔹 View Details Modal */}
      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title="Teacher Details"
        actions={
          <>
            <ButtonComp title="Edit" onClick={handleEdit} />
            <ButtonComp title="Delete" onClick={() => setOpen(true)} />
          </>
        }
      >
        {selectedTeacher ? (
          <Box>
            {/* Header with photo */}
            <Box display="flex" alignItems="center" gap={3} mb={3}>
              <Avatar
                src={selectedTeacher.photoUrl}
                alt={selectedTeacher.firstname}
                sx={{ width: 100, height: 100, borderRadius: "50%" }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedTeacher.firstname} {selectedTeacher.lastname}
                </Typography>
                <Typography color="textSecondary">{selectedTeacher.email}</Typography>
                <Typography color="textSecondary">
                  <b>Employee ID:</b> {selectedTeacher.EmpId}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Main Details */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  <b>Gender:</b> {selectedTeacher.gender}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Phone Number:</b> {selectedTeacher.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Experience Duration:</b>{" "}
                  {selectedTeacher.experienceDuration
                    ? new Date(selectedTeacher.experienceDuration).toLocaleDateString()
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Experience Details:</b> {selectedTeacher.experienceDetails || "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Class Incharge:</b>{" "}
                  {selectedTeacher.classincharge
                    ? typeof selectedTeacher.classincharge === "object"
                      ? selectedTeacher.classincharge.name
                      : selectedTeacher.classincharge
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Subjects:</b>{" "}
                  {Array.isArray(selectedTeacher.subjects) && selectedTeacher.subjects.length > 0
                    ? selectedTeacher.subjects
                        .map((sub) => (typeof sub === "object" ? sub.name : sub))
                        .join(", ")
                    : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Documents */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Documents
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={3}>
              {selectedTeacher.experienceCertificate && (
                <Box>
                  <Typography variant="body2">
                    <b>Experience Certificate</b>
                  </Typography>
                  <img
                    src={selectedTeacher.experienceCertificate}
                    alt="Experience Certificate"
                    style={{ width: 180, height: "auto", borderRadius: 8 }}
                  />
                </Box>
              )}

              {selectedTeacher.identityVerification && (
                <Box>
                  <Typography variant="body2">
                    <b>Identity Verification</b>
                  </Typography>
                  <img
                    src={selectedTeacher.identityVerification}
                    alt="Identity Verification"
                    style={{ width: 180, height: "auto", borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <Typography>No data available</Typography>
        )}
      </ReusableModal>
      <ReusableModal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Delete"
        actions={
          <>
            <ButtonComp title="Cancel" onClick={() => setOpen(false)} />
            <ButtonComp
              title="Confirm"
              onClick={() => {
                handleDelete(selectedTeacher._id);
                setOpen(false);
              }}
            />
          </>
        }
      >
        <Typography>Are you sure you want to delete this teacher?</Typography>
      </ReusableModal>
    </Box>
  );
};

export default TeachersList;
