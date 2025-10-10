import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableComponent from "../../components/table";
import SearchInput from "../../components/searchInput";
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

  // Search states
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchEmpId, setSearchEmpId] = useState("");
  const [searchExperienceDuration, setSearchExperienceDuration] = useState("");
  const [searchExperienceDetails, setSearchExperienceDetails] = useState("");
  const [searchSubjects, setSearchSubjects] = useState("");
  const [searchClassIncharge, setSearchClassIncharge] = useState("");

  // Delete confirm modal
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

  // const handleDelete = () => {};

  const confirmDelete = async (id) => {
    await dispatch(deleteTeacherThunk(id)).unwrap();
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
    setConfirmDeleteOpen(false);
  };

  // 🔹 Table Columns
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
            size="small"
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
            size="small"
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
            size="small"
          />
        </Box>
      ),
      render: (row) => row.email,
    },
    {
      field: "gender",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Gender</Typography>
          <SearchInput
            value={searchGender}
            onChange={setSearchGender}
            placeholder="Search..."
            debounceTime={300}
            size="small"
          />
        </Box>
      ),
      render: (row) => row.gender || "-",
    },
    {
      field: "EmpId",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Employee ID</Typography>
          <SearchInput
            value={searchEmpId}
            onChange={setSearchEmpId}
            placeholder="Search..."
            debounceTime={300}
            size="small"
          />
        </Box>
      ),
      render: (row) => row.EmpId || "-",
    },
    {
      field: "experienceDuration",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Experience Duration</Typography>
          <SearchInput
            value={searchExperienceDuration}
            onChange={setSearchExperienceDuration}
            placeholder="Search..."
            debounceTime={300}
            size="small"
          />
        </Box>
      ),
      render: (row) =>
        row.experienceDuration ? new Date(row.experienceDuration).toLocaleDateString() : "-",
    },
    {
      field: "experienceDetails",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Experience Details</Typography>
          <SearchInput
            value={searchExperienceDetails}
            onChange={setSearchExperienceDetails}
            placeholder="Search..."
            debounceTime={300}
            size="small"
          />
        </Box>
      ),
      render: (row) => row.experienceDetails || "-",
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
            size="small"
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
            size="small"
          />
        </Box>
      ),
      render: (row) => row.classInchargeOf?.name || "-",
    },
  ];

  // 🔹 Action Column with Icons
  const customRowActions = (row) => (
    <Box display="flex" alignItems="center">
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

  const dataWithSlno = filteredData.map((row, index) => ({
    ...row,
    slno: (page - 1) * rowsPerPage + (index + 1),
  }));

  return (
    <Box p={3}>
      {/* Header */}
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

      {/* Table */}
      <TableComponent
        columns={columns}
        data={dataWithSlno}
        loading={loading}
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
    </Box>
  );
};

export default TeachersList;
