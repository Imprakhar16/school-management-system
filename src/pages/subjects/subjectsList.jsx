import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableModal from "../../components/modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllSubjectsThunk, deleteSubjectThunk } from "../../features/subjects/subjectThunk";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, CircularProgress, Typography, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { showToast } from "../../components/toaster";
import TableComponent from "../../components/table";
import Pagination from "../../components/pagination";
import ButtonComp from "../../components/button";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, pagination, loading } = useSelector((state) => state.subject);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState({ name: "", code: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (subject) =>
        subject?.name?.toLowerCase().includes(search.name.toLowerCase()) &&
        subject?.code?.toLowerCase().includes(search.code.toLowerCase())
    );
  }, [data, search.name, search.code]);

  const handleDelete = (_id) => {
    const subject = data.find((subj) => subj._id === _id);
    if (!subject) {
      return showToast({ message: "❌ Invalid subject ID!", status: "error" });
    }
    setSubjectToDelete(subject);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!subjectToDelete?._id) return;
    try {
      await dispatch(deleteSubjectThunk(subjectToDelete._id)).unwrap();
      showToast({ message: "Subject deleted successfully!", status: "success" });
      dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
    } catch (err) {
      showToast({ message: `❌ Failed to delete: ${err}`, status: "error" });
    } finally {
      setModalOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(fetchAllSubjectsThunk({ page: newPage, limit: itemsPerPage }));
  };

  const columns = [
    {
      field: "name",
      headerName: "Subject Name",
      render: (row) => row.name,
      filter: (
        <TextField
          placeholder="Search Name"
          name="name"
          value={search.name}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      ),
    },
    {
      field: "code",
      headerName: "Sub-Code",
      render: (row) => row.code,
      filter: (
        <TextField
          placeholder="Search Code"
          name="code"
          value={search.code}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      ),
    },
  ];

  const customRowActions = (subject) => (
    <>
      <Button size="small" onClick={() => navigate("/addSubject", { state: { subject } })}>
        <EditIcon />
      </Button>
      <Button size="small" color="error" onClick={() => handleDelete(subject._id)}>
        <DeleteIcon />
      </Button>
    </>
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Subjects List
        </Typography>
        <Link to="/addSubject">
          <ButtonComp
            title="Add Subject"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          />
        </Link>
      </Box>

      <TableComponent
        columns={columns}
        data={filteredData}
        loading={loading}
        filterRow={{
          name: columns[0].filter,
          code: columns[1].filter,
        }}
        customRowActions={customRowActions}
      />

      <Pagination
        page={currentPage}
        limit={itemsPerPage}
        setLimit={setItemsPerPage}
        onPageChange={handlePageChange}
        totalPage={pagination?.totalPages || 1}
        total={pagination?.totalSubjects || 0}
      />

      <ReusableModal
        open={modalOpen && subjectToDelete}
        onClose={() => {
          setModalOpen(false);
          setSubjectToDelete(null);
        }}
        title="Confirm Delete"
        actions={[
          <Button
            key="cancel"
            onClick={() => {
              setModalOpen(false);
              setSubjectToDelete(null);
            }}
          >
            Cancel
          </Button>,
          <Button key="delete" onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>,
        ]}
      >
        <Typography>
          Are you sure you want to delete the subject <strong>{subjectToDelete?.name}</strong>?
        </Typography>
      </ReusableModal>
    </Paper>
  );
};

export default SubjectsList;
