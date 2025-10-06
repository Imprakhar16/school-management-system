import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { deleteSectionThunk, fetchSectionsThunk } from "../../features/section/sectionThunk";
import { showToast } from "../../components/toaster";
import Button from "../../components/button";
import TableComponent from "../../components/table";
import EditIcon from "@mui/icons-material/Edit";

const SectionHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sections, loading, totalCount } = useSelector((state) => state.sections);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
  }, [page, rowsPerPage, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      dispatch(deleteSectionThunk(id)).then(() => {
        showToast({ status: "success", message: "Section deleted successfully" });
        dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
      });
    }
  };

  const columns = [
    { field: "sectionId", headerName: "Section ID" },
    { field: "name", headerName: "Section Name" },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Sections List
          </Typography>
          <Button
            title="Create Section"
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-section")}
          />
        </Box>

        <TextField
          variant="outlined"
          placeholder="Search by section name"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableComponent
          columns={columns}
          data={sections}
          loading={loading}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(newPage) => setPage(newPage)}
          onRowsPerPageChange={(newRows) => {
            setRowsPerPage(newRows);
            setPage(1);
          }}
          customRowActions={(row) => (
            <>
              <Tooltip title="Edit Section">
                <IconButton color="primary" onClick={() => navigate(`/edit-section/${row._id}`)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Section">
                <IconButton color="error" onClick={() => handleDelete(row._id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        />
      </Paper>
    </Box>
  );
};

export default SectionHome;
