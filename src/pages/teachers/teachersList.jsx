import React, { useEffect, useState, useMemo } from "react";
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

const TeachersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teachers, pagination, loading } = useSelector((state) => state.teacher || {});

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 🔍 Search states
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchEmpId, setSearchEmpId] = useState("");
  const [searchExperienceDuration, setSearchExperienceDuration] = useState("");
  const [searchExperienceDetails, setSearchExperienceDetails] = useState("");
  const [searchSubjects, setSearchSubjects] = useState("");
  const [searchClassIncharge, setSearchClassIncharge] = useState("");

  // 🔹 Delete confirm modal
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  // 🔍 Filtered Data
  const filteredData = useMemo(() => {
    if (!teachers) return [];
    return teachers.filter((teacher) => {
      const match = (field, search) => field?.toLowerCase().includes(search.toLowerCase()) ?? false;
      const subjectsText = teacher?.subjects?.map((s) => s.name).join(", ") || "";
      const classInchargeText = teacher?.classInchargeOf?.name || "";
      const empIdText = teacher?.EmpId?.toString() || "";
      const experienceDurationText = teacher?.experienceDuration
        ? new Date(teacher.experienceDuration).toLocaleDateString()
        : "";

      return (
        match(teacher.firstname, searchFirstName) &&
        match(teacher.lastname, searchLastName) &&
        match(teacher.email, searchEmail) &&
        match(teacher.gender, searchGender) &&
        match(empIdText, searchEmpId) &&
        match(experienceDurationText, searchExperienceDuration) &&
        match(teacher.experienceDetails || "", searchExperienceDetails) &&
        match(subjectsText, searchSubjects) &&
        match(classInchargeText, searchClassIncharge)
      );
    });
  }, [
    teachers,
    searchFirstName,
    searchLastName,
    searchEmail,
    searchGender,
    searchEmpId,
    searchExperienceDuration,
    searchExperienceDetails,
    searchSubjects,
    searchClassIncharge,
  ]);

  // 🔹 Handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchAllTeachersThunk({ page: newPage, limit: rowsPerPage }));
  };

  const handleEdit = (teacher) => {
    navigate("/registerTeacher", {
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
      render: (row) => row.subjects?.map((s) => `${s.name} (${s.code})`).join(", ") || "-",
    },
    {
      field: "classincharge",
      headerName: "CLASS INCHARGE",
      render: (row) => row.classInchargeOf?.name || "-",
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
                  value={searchFirstName}
                  onChange={(e) => setSearchFirstName(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 140 }}
                />
              ),
              lastname: (
                <TextField
                  placeholder="Search Last Name"
                  value={searchLastName}
                  onChange={(e) => setSearchLastName(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 140 }}
                />
              ),
              email: (
                <TextField
                  placeholder="Search Email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 180 }}
                />
              ),
              gender: (
                <TextField
                  placeholder="Search Gender"
                  value={searchGender}
                  onChange={(e) => setSearchGender(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 110 }}
                />
              ),
              EmpId: (
                <TextField
                  placeholder="Search Emp ID"
                  value={searchEmpId}
                  onChange={(e) => setSearchEmpId(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 120 }}
                />
              ),
              experienceDuration: (
                <TextField
                  placeholder="Search Duration"
                  value={searchExperienceDuration}
                  onChange={(e) => setSearchExperienceDuration(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 130 }}
                />
              ),
              experienceDetails: (
                <TextField
                  placeholder="Search Details"
                  value={searchExperienceDetails}
                  onChange={(e) => setSearchExperienceDetails(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 180 }}
                />
              ),
              subjects: (
                <TextField
                  placeholder="Search Subjects"
                  value={searchSubjects}
                  onChange={(e) => setSearchSubjects(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 200 }}
                />
              ),
              classincharge: (
                <TextField
                  placeholder="Search Class Incharge"
                  value={searchClassIncharge}
                  onChange={(e) => setSearchClassIncharge(e.target.value)}
                  size="small"
                  sx={{ height: 32, "& .MuiInputBase-root": { height: 32 }, width: 170 }}
                />
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
