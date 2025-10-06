import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TableComponent from "../../components/table";
import SearchInput from "../../components/searchInput";
import { fetchAllTeachersThunk } from "../../features/teachers/teacherThunk";

const TeachersList = () => {
  const dispatch = useDispatch();
  const { teachers, meta, loading } = useSelector((state) => state.teacher || {});

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 🔍 Individual column search states
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchSubjects, setSearchSubjects] = useState("");
  const [searchClassIncharge, setSearchClassIncharge] = useState("");

  // Fetch teachers from backend
  useEffect(() => {
    dispatch(fetchAllTeachersThunk({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  // 🔍 Filter data locally using memoization
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

  // 🧱 Table Columns (with SearchInput under each header)
  const columns = [
    {
      headerName: "Sl. No.",
      field: "slno",
      render: (value, row) => (page - 1) * rowsPerPage + (filteredData.indexOf(row) + 1),
    },
    {
      field: "firstname",
      headerName: (
        <Box>
          <Typography variant="subtitle2">First Name</Typography>
          <SearchInput
            value={searchFirstName}
            onChange={(val) => setSearchFirstName(val)}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (value) => value,
    },
    {
      field: "lastname",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Last Name</Typography>
          <SearchInput
            value={searchLastName}
            onChange={(val) => setSearchLastName(val)}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (value) => value,
    },
    {
      field: "email",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Email</Typography>
          <SearchInput
            value={searchEmail}
            onChange={(val) => setSearchEmail(val)}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (value) => value,
    },
    {
      field: "subjects",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Subjects</Typography>
          <SearchInput
            value={searchSubjects}
            onChange={(val) => setSearchSubjects(val)}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (subjects) => subjects?.map((s) => `${s.name} (${s.code})`).join(", ") || "-",
    },
    {
      field: "classincharge",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Class Incharge</Typography>
          <SearchInput
            value={searchClassIncharge}
            onChange={(val) => setSearchClassIncharge(val)}
            placeholder="Search..."
            debounceTime={300}
          />
        </Box>
      ),
      render: (cls) => cls?.name || "-",
    },
  ];

  // ⚙️ Row actions (Edit/Delete)
  const rowActions = (teacher) => (
    <>
      <Button size="small" onClick={() => console.log("Edit teacher:", teacher._id)} sx={{ mr: 1 }}>
        Edit
      </Button>
      <Button
        size="small"
        color="error"
        onClick={() => console.log("Delete teacher:", teacher._id)}
      >
        Delete
      </Button>
    </>
  );

  return (
    <Box p={3}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Teachers List
        </Typography>
        <Link to="/registerTeacher">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Teacher
          </Button>
        </Link>
      </Box>

      {/* ✅ Table Component with Column Filters */}
      <TableComponent
        columns={columns}
        data={filteredData}
        loading={loading}
        totalCount={meta?.totalTeachers || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        customRowActions={rowActions}
        emptyMessage="No teachers found."
      />
    </Box>
  );
};

export default TeachersList;
