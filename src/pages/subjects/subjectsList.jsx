import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableModal from "../../components/modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllSubjectsThunk, deleteSubjectThunk } from "../../features/subjects/subjectThunk";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { showToast } from "../../components/toaster";
import TableComponent from "../../components/table";
import SearchInput from "../../components/searchInput";
import Pagination from "../../components/pagination";
import ButtonComp from "../../components/button";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, pagination, loading } = useSelector((state) => state.subject);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (subject) =>
        subject?.name?.toLowerCase().includes(searchName.toLowerCase()) &&
        subject?.code?.toLowerCase().includes(searchCode.toLowerCase())
    );
  }, [data, searchName, searchCode]);

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
      field: "slNo",
      headerName: "SL.No",
      render: (row) => row.slNo,
    },
    {
      field: "name",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Subject Name</Typography>
          <SearchInput
            value={searchName}
            onChange={setSearchName}
            placeholder="Search Name"
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.name,
    },
    {
      field: "code",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Sub-Code</Typography>
          <SearchInput
            value={searchCode}
            onChange={setSearchCode}
            placeholder="Search Code"
            debounceTime={300}
          />
        </Box>
      ),
      render: (row) => row.code,
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
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
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

      <Paper sx={{ overflow: "hidden" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableComponent
            columns={columns}
            data={filteredData.map((row, index) => ({
              ...row,
              slNo: (currentPage - 1) * itemsPerPage + (index + 1),
            }))}
            loading={loading}
            customRowActions={customRowActions}
          />
        )}
      </Paper>

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
    </Box>
  );
};

export default SubjectsList;
