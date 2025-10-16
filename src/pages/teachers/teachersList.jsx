import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, TextField, Typography, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableComponent from "../../components/table";
import { fetchAllTeachersThunk, deleteTeacherThunk } from "../../features/teachers/teacherThunk";
import ButtonComp from "../../components/button";
import Pagination from "../../components/pagination";
import ReusableModal from "../../components/modal";
import { renderArrayChips } from "../../helper/renderHelper";

const TeachersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teachers, pagination, loading } = useSelector((state) => state.teacher || {});

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search
  const [search, setSearch] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    EmpId: "",
    experienceDuration: "",
    experienceDetails: "",
    subjects: "",
    classincharge: "",
    isActive: "",
  });

  // Delete confirm modal
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  // Handle search input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value.toLowerCase(),
    });
  };

  // Filtered Data
  const filteredData = teachers?.filter((teacher) => {
    const subjectsText = teacher?.subjects?.map((s) => s.name).join(", ") || "";
    const classInchargeText = teacher?.classInchargeOf?.name || "";
    const empIdText = teacher?.EmpId?.toString() || "";
    const experienceDurationText = teacher?.experienceDuration
      ? new Date(teacher.experienceDuration).toLocaleDateString()
      : "";

    return (
      teacher.firstname?.toLowerCase().includes(search.firstname) &&
      teacher.lastname?.toLowerCase().includes(search.lastname) &&
      teacher.email?.toLowerCase().includes(search.email) &&
      teacher.gender?.toLowerCase().includes(search.gender) &&
      empIdText.includes(search.EmpId) &&
      experienceDurationText.toLowerCase().includes(search.experienceDuration) &&
      (teacher.experienceDetails || "").toLowerCase().includes(search.experienceDetails) &&
      subjectsText.toLowerCase().includes(search.subjects) &&
      classInchargeText.toLowerCase().includes(search.classincharge) &&
      (typeof teacher?.isActive === "string"
        ? teacher.isActive.toLowerCase().includes(search.isActive)
        : String(teacher?.isActive).toLowerCase().includes(search.isActive)) // Handles boolean or other values
    );
  });

  // Handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchAllTeachersThunk({ page: newPage, limit: rowsPerPage }));
  };

  const handleEdit = (teacher) => {
    navigate(`/updateTeacher/${teacher._id}`, {
      state: {
        teacherData: teacher,
        isEdit: true,
      },
    });
  };

  const confirmDelete = async (id) => {
    await dispatch(deleteTeacherThunk(id)).unwrap();
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
    setConfirmDeleteOpen(false);
  };

  const columns = [
    { field: "firstname", headerName: "FIRSTNAME", render: (row) => row.firstname },
    { field: "lastname", headerName: "LASTNAME", render: (row) => row.lastname },
    { field: "email", headerName: "EMAIL", render: (row) => row.email },
    { field: "gender", headerName: "GENDER", render: (row) => row.gender || "-" },
    { field: "EmpId", headerName: "EMPLOYEE ID", render: (row) => row.EmpId || "-" },
    {
      field: "experienceDuration",
      headerName: "EXPERIENCE DURATION",
      render: (row) =>
        row.experienceDuration ? new Date(row.experienceDuration).toLocaleDateString() : "-",
    },
    {
      field: "experienceDetails",
      headerName: "EXPERIENCE DETAILS",
      render: (row) => row.experienceDetails || "-",
    },
    {
      field: "subjects",
      headerName: "SUBJECTS",
      render: (row) => renderArrayChips(row.subjects, (s) => `${s.name} (${s.code})`),
    },
    {
      field: "classincharge",
      headerName: "CLASS INCHARGE",
      render: (row) => row.classInchargeOf?.name || "-",
    },
    {
      field: "isActive",
      headerName: "STATUS",
      render: (row) => (
        <Typography
          sx={{
            color: row.isActive ? "green" : "red",
          }}
        >
          {row.isActive ? "Active" : "Inactive"}
        </Typography>
      ),
    },
  ];

  const customRowActions = (row) => (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton color="primary" onClick={() => handleEdit(row)} title="Edit" size="small">
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => {
          setSelectedTeacher(row);
          setConfirmDeleteOpen(true);
        }}
        title="Delete"
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
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

      {/* Scrollable Table */}
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#9e9e9e" },
        }}
      >
        <Box sx={{ minWidth: "1600px" }}>
          <TableComponent
            columns={columns}
            data={filteredData}
            loading={loading}
            filterRow={{
              firstname: (
                <TextField
                  placeholder="Search First Name"
                  name="firstname"
                  value={search.firstname}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 140 }}
                />
              ),
              lastname: (
                <TextField
                  placeholder="Search Last Name"
                  name="lastname"
                  value={search.lastname}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 140 }}
                />
              ),
              email: (
                <TextField
                  placeholder="Search Email"
                  name="email"
                  value={search.email}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 180 }}
                />
              ),
              gender: (
                <TextField
                  placeholder="Search Gender"
                  name="gender"
                  value={search.gender}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 110 }}
                />
              ),
              EmpId: (
                <TextField
                  placeholder="Search Emp ID"
                  name="EmpId"
                  value={search.EmpId}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 120 }}
                />
              ),
              experienceDuration: (
                <TextField
                  placeholder="Search Duration"
                  name="experienceDuration"
                  value={search.experienceDuration}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 130 }}
                />
              ),
              experienceDetails: (
                <TextField
                  placeholder="Search Details"
                  name="experienceDetails"
                  value={search.experienceDetails}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 180 }}
                />
              ),
              subjects: (
                <TextField
                  placeholder="Search Subjects"
                  name="subjects"
                  value={search.subjects}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 200 }}
                />
              ),
              classincharge: (
                <TextField
                  placeholder="Search Class Incharge"
                  name="classincharge"
                  value={search.classincharge}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 170 }}
                />
              ),
              isActive: (
                <TextField
                  style={{ color: teachers.isActive === true ? "green" : "red" }}
                  placeholder="Search Status"
                  name="isActive"
                  value={search.isActive}
                  onChange={handleChange}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 200 }}
                ></TextField>
              ),
            }}
            customRowActions={customRowActions}
            emptyMessage="No teachers found."
          />
        </Box>
      </Box>

      {/* Pagination */}
      <Pagination
        page={page}
        limit={rowsPerPage}
        setLimit={setRowsPerPage}
        onPageChange={handlePageChange}
        totalPage={pagination?.totalPages || 1}
        total={pagination?.total || 0}
      />

      {/* Delete Confirmation */}
      <ReusableModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        title="Confirm Delete"
        actions={
          <>
            <ButtonComp title="Cancel" onClick={() => setConfirmDeleteOpen(false)} />
            <ButtonComp
              title="Delete"
              color="error"
              onClick={() => confirmDelete(selectedTeacher?._id)}
              variant="contained"
            />
          </>
        }
      >
        <Typography>Are you sure you want to delete this teacher?</Typography>
      </ReusableModal>
    </Paper>
  );
};

export default TeachersList;
