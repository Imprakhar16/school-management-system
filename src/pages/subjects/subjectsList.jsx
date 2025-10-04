import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubjectsThunk,
  deleteSubjectThunk,
  updateSubjectThunk,
} from "../../features/subjects/subjectThunk";
import { Link } from "react-router-dom";

// Material UI
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { showToast } from "../../components/toaster";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector((state) => state.subject);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Column-specific search state
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", code: "" });

  // Fetch data on mount/page/limit change
  useEffect(() => {
    dispatch(fetchAllSubjectsThunk({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  // Filter data locally
  const filteredData = data
    ? data?.filter(
        (subject) =>
          subject?.name?.toLowerCase().includes(searchName.toLowerCase()) &&
          subject?.code?.toLowerCase().includes(searchCode.toLowerCase())
      )
    : [];

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  // Delete subject
  const handleDelete = async (_id) => {
    if (!_id) {
      showToast({ message: "❌ Invalid subject ID!", status: "error" });
      return;
    }

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

  // Open edit modal
  const handleEditOpen = (subject) => {
    setEditSubject(subject);
    setEditValues({ name: subject.name, code: subject.code });
    setOpenModal(true);
  };

  // Close modal
  const handleModalClose = () => {
    setOpenModal(false);
    setEditSubject(null);
    setEditValues({ name: "", code: "" });
  };

  // Save edited subject
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

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL.No</TableCell>

              <TableCell>
                <Typography variant="subtitle2">Subject Name</Typography>
                <TextField
                  size="small"
                  placeholder="Search Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  fullWidth
                />
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2">Sub-Code</Typography>
                <TextField
                  size="small"
                  placeholder="Search Code"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  fullWidth
                />
              </TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !filteredData || filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No subjects found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((subject, index) => (
                <TableRow key={subject._id || index}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + (index + 1)}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEditOpen(subject)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(subject._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} px={1}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Rows per page</InputLabel>
          <Select
            value={itemsPerPage}
            label="Rows per page"
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={pagination.totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
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
