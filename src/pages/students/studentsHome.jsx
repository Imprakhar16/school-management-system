import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchStudentThunk } from "../../features/students/studentsThunk";
import ButtonComp from "../../components/button";
import TableComponent from "../../components/table";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";

const StudentsHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
      render: (row) => (row.class.name ? `${row.class.name}` : "N/A"),
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const filteredData = students?.filter(
    (s) =>
      String(s.rollNo)?.includes(search.rollNo) &&
      s.firstname?.toLowerCase().includes(search.firstname) &&
      s.lastname?.toLowerCase().includes(search.lastname) &&
      s.parentname?.toLowerCase().includes(search.parentname) &&
      String(s.class.name)?.includes(search.class)
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchStudentThunk(newPage, limit));
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
        customRowActions={() => (
          <>
            <ButtonComp title="Details" variant="contained" color="primary" />
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
    </Paper>
  );
};

export default StudentsHome;
