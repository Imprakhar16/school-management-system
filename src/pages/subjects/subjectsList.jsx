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
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { showToast } from "../../components/toaster";
import Pagination from "../../components/pagination";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector((state) => state.subject);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Column-specific search state
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");

  // Inline editing state
  const [editSubjectId, setEditSubjectId] = useState(null);
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

  // Start editing a row
  const handleEditStart = (subject) => {
    setEditSubjectId(subject._id);
    setEditValues({ name: subject.name, code: subject.code });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditSubjectId(null);
    setEditValues({ name: "", code: "" });
  };

  // Save edited subject
  const handleEditSave = async (_id) => {
    try {
      await dispatch(
        updateSubjectThunk({
          _id,
          updatedData: { name: editValues.name, code: editValues.code },
        })
      ).unwrap();

      showToast({ message: "✅ Subject updated successfully!", status: "success" });
      setEditSubjectId(null);
      setEditValues({ name: "", code: "" });
    } catch (err) {
      showToast({ message: `❌ Failed to update: ${err}`, status: "error" });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(fetchAllSubjectsThunk(newPage, itemsPerPage));
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
              filteredData.map((subject, index) => {
                const isEditing = editSubjectId === subject._id;
                return (
                  <TableRow key={subject._id || index}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + (index + 1)}</TableCell>

                    {/* Subject Name */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editValues.name}
                          onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                        />
                      ) : (
                        subject.name
                      )}
                    </TableCell>

                    {/* Subject Code */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editValues.code}
                          onChange={(e) => setEditValues({ ...editValues, code: e.target.value })}
                        />
                      ) : (
                        subject.code
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      {isEditing ? (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditSave(subject._id)}
                            sx={{ mr: 1 }}
                          >
                            Save
                          </Button>
                          <Button size="small" color="secondary" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="small"
                            onClick={() => handleEditStart(subject)}
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleDelete(subject._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        page={currentPage}
        limit={itemsPerPage}
        setLimit={setItemsPerPage}
        onPageChange={handlePageChange}
        totalPage={pagination.totalPages}
        total={pagination.totalSubjects}
      />
    </Box>
  );
};

export default SubjectsList;
