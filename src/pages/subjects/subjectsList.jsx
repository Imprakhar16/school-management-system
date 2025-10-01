import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubjectsThunk } from "../../features/subjects/subjectThunk";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchAllSubjectsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header with button */}
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
              <TableCell>Subject Name</TableCell>
              <TableCell>Sub-Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!subjects || subjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No subjects found
                </TableCell>
              </TableRow>
            ) : (
              subjects.subjects.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>
                    <button>edit</button>
                    <button>delete</button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubjectsList;
