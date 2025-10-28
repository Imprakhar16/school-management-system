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
import useDebounce from "../../hooks/useDebounce";

const TeachersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teachers, pagination, loading } = useSelector((state) => state.teacher || {});

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    EmpId: "",
    experienceStart: "",
    experienceEnd: "",
    experienceDetails: "",
    subjects: "",
    classInchargeOf: "",
    isActive: "",
  });

  const debouncedSearch = useDebounce(search, 500);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const filters = {};

    Object.keys(debouncedSearch).forEach((key) => {
      if (debouncedSearch[key]) filters[key] = debouncedSearch[key];
    });

    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage, filters }));
  }, [dispatch, page, rowsPerPage, debouncedSearch]);

  // 🔹 Handle search changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    setPage(1);
  };

  // 🔹 Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 🔹 Edit teacher
  const handleEdit = (teacher) => {
    navigate(`/updateTeacher/${teacher._id}`, {
      state: {
        teacherData: teacher,
        isEdit: true,
      },
    });
  };

  // 🔹 Delete teacher
  const confirmDelete = async (id) => {
    await dispatch(deleteTeacherThunk(id)).unwrap();
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
    setConfirmDeleteOpen(false);
  };

  // 🔹 Table columns
  const columns = [
    { field: "firstname", headerName: "FIRSTNAME", render: (row) => row.firstname },
    { field: "lastname", headerName: "LASTNAME", render: (row) => row.lastname },
    { field: "email", headerName: "EMAIL", render: (row) => row.email },
    { field: "gender", headerName: "GENDER", render: (row) => row.gender || "-" },
    { field: "EmpId", headerName: "EMPLOYEE ID", render: (row) => row.EmpId || "-" },
    {
      field: "experienceStart",
      headerName: "EXPERIENCE START",
      render: (row) =>
        row.experienceStart ? new Date(row.experienceStart).toLocaleDateString() : "-",
    },
    {
      field: "experienceEnd",
      headerName: "EXPERIENCE END",
      render: (row) => (row.experienceEnd ? new Date(row.experienceEnd).toLocaleDateString() : "-"),
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
      field: "classInchargeOf",
      headerName: "CLASS INCHARGE",
      render: (row) => row.classInchargeOf?.name || "-",
    },
    {
      field: "isActive",
      headerName: "STATUS",
      render: (row) => (
        <Typography sx={{ color: row.isActive ? "green" : "red" }}>
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

      {/* Table with filter inputs */}
      <TableComponent
        columns={columns}
        data={teachers}
        loading={loading}
        filterRow={{
          firstname: (
            <TextField
              placeholder="Search First Name"
              name="firstname"
              value={search.firstname}
              onChange={handleChange}
              size="small"
            />
          ),
          lastname: (
            <TextField
              placeholder="Search Last Name"
              name="lastname"
              value={search.lastname}
              onChange={handleChange}
              size="small"
            />
          ),
          email: (
            <TextField
              placeholder="Search Email"
              name="email"
              value={search.email}
              onChange={handleChange}
              size="small"
            />
          ),
          gender: (
            <TextField
              placeholder="Search Gender"
              name="gender"
              value={search.gender}
              onChange={handleChange}
              size="small"
            />
          ),
          EmpId: (
            <TextField
              placeholder="Search Emp ID"
              name="EmpId"
              value={search.EmpId}
              onChange={handleChange}
              size="small"
            />
          ),
          experienceStart: (
            <TextField
              placeholder="Search Start"
              name="experienceStart"
              value={search.experienceStart}
              onChange={handleChange}
              size="small"
            />
          ),
          experienceEnd: (
            <TextField
              placeholder="Search End"
              name="experienceEnd"
              value={search.experienceEnd}
              onChange={handleChange}
              size="small"
            />
          ),
          experienceDetails: (
            <TextField
              placeholder="Search Details"
              name="experienceDetails"
              value={search.experienceDetails}
              onChange={handleChange}
              size="small"
            />
          ),
          subjects: (
            <TextField
              placeholder="Search Subjects"
              name="subjects"
              value={search.subjects}
              onChange={handleChange}
              size="small"
            />
          ),
          classInchargeOf: (
            <TextField
              placeholder="Search Class Incharge"
              name="classInchargeOf"
              value={search.classInchargeOf}
              onChange={handleChange}
              size="small"
            />
          ),
          isActive: (
            <TextField
              placeholder="Search Status"
              name="isActive"
              value={search.isActive}
              onChange={handleChange}
              size="small"
            />
          ),
        }}
        customRowActions={customRowActions}
        emptyMessage="No teachers found."
      />

      {/* Pagination */}
      <Pagination
        page={page}
        limit={rowsPerPage}
        setLimit={setRowsPerPage}
        onPageChange={handlePageChange}
        totalPage={pagination?.totalPages || 1}
        total={pagination?.total || 0}
      />

      {/* Delete Confirmation Modal */}
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
