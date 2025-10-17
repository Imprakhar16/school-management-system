import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, TextField, Typography, IconButton, Tooltip, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { showToast } from "../../components/toaster";
import { deleteStudentThunk, fetchStudentThunk } from "../../features/students/studentsThunk";
import ButtonComp from "../../components/button";
import TableComponent from "../../components/table";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import ReusableModal from "../../components/modal";

const StudentsHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { students, loading, totalPages, totalStudents } = useSelector((state) => state.student);
  const [deleteStudentModal, setDeleteStudentModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [search, setSearch] = useState({
    rollNo: "",
    firstname: "",
    lastname: "",
    parentname: "",
    gender: "",
    email: "",
    class: "",
    section: "",
    isActive: "",
  });
  useEffect(() => {
    dispatch(fetchStudentThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const columns = [
    { field: "rollNo", headerName: "ROLLNO" },
    { field: "firstname", headerName: "FIRSTNAME" },
    { field: "lastname", headerName: "LASTNAME" },
    { field: "parentname", headerName: "PARENTNAME" },
    { field: "gender", headerName: "GENDER" },
    { field: "email", headerName: "EMAIL" },
    {
      field: "class",
      headerName: "CLASS",
      render: (row) => (row.class?.name ? `${row.class.name}` : "N/A"),
    },
    {
      field: "section",
      headerName: "SECTION",
      render: (row) => (row.section?.name ? row.section.name : "-"),
    },
    {
      field: "isActive",
      headerName: "STATUS",
      render: (row) =>
        row.isActive === true ? "Active" : row.isActive === false ? "Inactive" : "-",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value.toLowerCase(),
    });
  };

  const filteredData = students?.filter((s) => {
    String(s.rollNo)?.includes(search.rollNo) &&
      s.firstname?.toLowerCase().includes(search.firstname) &&
      s.lastname?.toLowerCase().includes(search.lastname) &&
      s.parentname?.toLowerCase().includes(search.parentname) &&
      s.gender.toLowerCase().includes(search.gender) &&
      s.email.toLowerCase().includes(search.email) &&
      String(s.class?.name)?.includes(search.class) &&
      s.section?.name.toLowerCase().includes(search.section);

    const matchActive = search.isActive === "" ? true : s.isActive === (search.isActive === "true");

    return matchActive;
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchStudentThunk(newPage, limit));
  };

  const handleDelete = (id) => {
    setDeleteStudentModal(true);
    setSelectedStudentId(id);
  };

  const handleConfirmDelete = () => {
    if (!selectedStudentId) return;
    dispatch(deleteStudentThunk(selectedStudentId))
      .unwrap()
      .then(() => {
        showToast({ status: "success", message: "Student deleted successfully" });
        dispatch(fetchStudentThunk({ page, limit }));
      })
      .catch((error) => {
        showToast({ status: "error", message: error?.message || "Failed to delete Class" });
      })
      .finally(() => {
        setDeleteStudentModal(false);
        setSelectedStudentId(null);
      });
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
          gender: (
            <TextField
              placeholder="Search Gender"
              name="gender"
              value={search.gender}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          email: (
            <TextField
              placeholder="Search email"
              name="email"
              value={search.email}
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
          section: (
            <TextField
              placeholder="Search Section"
              name="section"
              value={search.section}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          isActive: (
            <TextField
              select
              placeholder="Search Status"
              name="isActive"
              value={search.isActive}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          ),
        }}
        customRowActions={(row) => (
          <>
            <Box sx={{ display: "flex", columnGap: 2 }}>
              <Tooltip title="Edit Section">
                <IconButton
                  color="primary"
                  onClick={() => {
                    navigate("/create-student", { state: { studentData: row } });
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Section">
                <IconButton color="error" onClick={() => handleDelete(row._id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
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

      {/* Delete Student Modal */}
      <ReusableModal
        open={deleteStudentModal}
        onClose={() => setSelectedStudentId(false)}
        title="Confirm Deletion"
        actions={
          <>
            <ButtonComp
              title="cancel"
              variant="contained"
              onClick={() => setDeleteStudentModal(false)}
            />
            <ButtonComp
              title="delete"
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            />
          </>
        }
      >
        <Typography>Are you sure you want to delete this Student?</Typography>
      </ReusableModal>
    </Paper>
  );
};

export default StudentsHome;
