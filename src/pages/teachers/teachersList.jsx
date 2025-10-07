import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TableComponent from "../../components/table";
import SearchInput from "../../components/searchInput";
import { fetchAllTeachersThunk } from "../../features/teachers/teacherThunk";
import ButtonComp from "../../components/button";
import Pagination from "../../components/pagination";

const TeachersList = () => {
  const dispatch = useDispatch();
  const { teachers, pagination, meta, loading } = useSelector((state) => state.teacher || {});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchSubjects, setSearchSubjects] = useState("");
  const [searchClassIncharge, setSearchClassIncharge] = useState("");

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

  const customRowActions = () => (
    <>
      <Button size="small" sx={{ mr: 1 }}>
        Edit
      </Button>
      <Button size="small" color="error">
        Delete
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
    </Box>
  );
};

export default TeachersList;
