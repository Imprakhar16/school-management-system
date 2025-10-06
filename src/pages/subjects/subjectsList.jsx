import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubjectsThunk,
  deleteSubjectThunk,
  updateSubjectThunk,
} from "../../features/subjects/subjectThunk";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { showToast } from "../../components/toaster";
import TableComponent from "../../components/table";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector((state) => state.subject);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", code: "" });

  // Fetch data
  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  // Filtered subjects
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (subject) =>
        subject?.name?.toLowerCase().includes(searchName.toLowerCase()) &&
        subject?.code?.toLowerCase().includes(searchCode.toLowerCase())
    );
  }, [data, searchName, searchCode]);

  // Handle Delete
  const handleDelete = async (_id) => {
    if (!_id) return showToast({ message: "❌ Invalid subject ID!", status: "error" });

    if (window.confirm("⚠️ Are you sure you want to delete this subject?")) {
      try {
        await dispatch(deleteSubjectThunk(_id)).unwrap();
        showToast({ message: "✅ Subject deleted successfully!", status: "success" });
        dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
      } catch (err) {
        showToast({ message: `❌ Failed to delete: ${err}`, status: "error" });
      }
    }
  };

  // Edit Handlers
  const handleEditOpen = (subject) => {
    setEditSubject(subject);
    setEditValues({ name: subject.name, code: subject.code });
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setEditSubject(null);
    setEditValues({ name: "", code: "" });
  };

  const handleEditSave = async () => {
    if (!editSubject?._id) return;

    try {
      await dispatch(
        updateSubjectThunk({
          _id: editSubject._id,
          updatedData: { name: editValues.name, code: editValues.code },
        })
      ).unwrap();
      showToast({ message: "✅ Subject updated successfully!", status: "success" });
      handleModalClose();
      dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
    } catch (err) {
      showToast({ message: `❌ Failed to update: ${err}`, status: "error" });
    }
  };

  // Table Columns
  const columns = [
    {
      field: "slNo",
      headerName: "SL.No",
      render: (value, row) => (currentPage - 1) * itemsPerPage + (filteredData.indexOf(row) + 1),
    },
    {
      field: "name",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Subject Name</Typography>
          <TextField
            size="small"
            placeholder="Search Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      render: (value) => value,
    },
    {
      field: "code",
      headerName: (
        <Box>
          <Typography variant="subtitle2">Sub-Code</Typography>
          <TextField
            size="small"
            placeholder="Search Code"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      render: (value) => value,
    },
  ];

  // Row Actions
  const rowActions = (subject) => (
    <>
      <Button size="small" onClick={() => handleEditOpen(subject)} sx={{ mr: 1 }}>
        Edit
      </Button>
      <Button size="small" color="error" onClick={() => handleDelete(subject._id)}>
        Delete
      </Button>
    </>
  );

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Subjects List
        </Typography>
        <Link to={"/addSubject"}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Subject
          </Button>
        </Link>
      </Box>

      {/* ✅ Reusable Table Component */}
      {loading && !data ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableComponent
          columns={columns}
          data={filteredData}
          loading={loading}
          totalCount={pagination?.totalDocs || filteredData.length}
          page={currentPage}
          rowsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setItemsPerPage}
          customRowActions={rowActions}
          emptyMessage="No subjects found."
        />
      )}

      {/* Edit Modal */}
      <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Subject</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Subject Name"
              fullWidth
              value={editValues.name}
              onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
            />
            <TextField
              label="Subject Code"
              fullWidth
              value={editValues.code}
              onChange={(e) => setEditValues({ ...editValues, code: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectsList;
