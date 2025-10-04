import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classListThunk, deleteClassThunk } from "../../features/class/classThunk";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ClassList() {
  const [page] = useState(1);
  const [limit] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(classListThunk(page, limit));
  }, [dispatch, limit, page]);

  const handleDelete = (id) => {
    dispatch(deleteClassThunk(id));
  };

  if (loading) return <p> Loading... </p>;
  if (error) return <p> {error} </p>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Title + Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Class List
        </Typography>

        <Button
          variant="contained"
          sx={{
            borderRadius: "8px",
            px: 3,
            py: 1,
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            "&:hover": {
              background: "linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)",
            },
          }}
          onClick={() => navigate("/addClass")}
        >
          + Create Class
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1e3c72" }}>
              {["Class Name", "Subjects", "Sections", "Created At", "Updated At", "Actions"].map(
                (head) => (
                  <TableCell
                    key={head}
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "0.9rem",
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {classes?.map((e) => (
              <TableRow
                key={e._id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "rgba(30,60,114,0.06)" },
                  transition: "0.2s ease-in-out",
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{e.name}</TableCell>
                <TableCell>
                  {e.subjects?.length > 0
                    ? e.subjects.map((s) => (
                        <Box
                          key={s._id}
                          sx={{
                            display: "inline-block",
                            background: "#f0f4ff",
                            color: "#1e3c72",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            mr: 0.5,
                          }}
                        >
                          {s.code || s.name}
                        </Box>
                      ))
                    : "—"}
                </TableCell>
                <TableCell>
                  {e.sections?.length > 0
                    ? e.sections.map((sec, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "inline-block",
                            background: "#e6f7f1",
                            color: "#0f5132",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            mr: 0.5,
                          }}
                        >
                          {sec}
                        </Box>
                      ))
                    : "—"}
                </TableCell>
                <TableCell>{new Date(e.createdAt).toLocaleDateString("en-GB")}</TableCell>
                <TableCell>{new Date(e.updatedAt).toLocaleDateString("en-GB")}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <Delete fontSize="small" onClick={() => handleDelete(e._id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
