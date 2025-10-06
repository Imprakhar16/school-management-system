import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import {
  deleteSectionThunk,
  fetchSectionsThunk,
  updateSectionThunk,
} from "../../features/section/sectionThunk";
import { showToast } from "../../components/toaster";
import TableComponent from "../../components/table";
import ReusableModal from "../../components/modal";
import SectionForm from "./createSection"; // Adjust path
import ButtonComp from "../../components/button";
import Pagination from "../../components/pagination";

const SectionHome = () => {
  const dispatch = useDispatch();

  const { sections, loading, totalCount, totalPages } = useSelector((state) => state.sections);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState({ sectionId: "", sectionName: "" });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ sectionId: "", name: "" });

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
  }, [page, rowsPerPage, debouncedSearch, dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedSectionId(id);
    setDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmDelete = () => {
    if (!selectedSectionId) return;

    dispatch(deleteSectionThunk(selectedSectionId))
      .unwrap()
      .then(() => {
        showToast({ status: "success", message: "Section deleted successfully" });
        dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
      })
      .catch((error) => {
        showToast({ status: "error", message: error?.message || "Failed to delete section" });
      })
      .finally(() => {
        setDeleteModalOpen(false);
        setSelectedSectionId(null);
      });
  };

  const handleEditClick = (id) => {
    const section = sections.find((sec) => sec._id === id);
    if (section) {
      setEditFormData({ sectionId: section.sectionId || "", name: section.name || "" });
      setEditModalOpen(true);
      setSelectedSectionId(id);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = () => {
    if (!selectedSectionId) return;

    dispatch(updateSectionThunk({ sectionId: selectedSectionId, data: editFormData }))
      .unwrap()
      .then(() => {
        showToast({ status: "success", message: "Section updated successfully" });
        dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
        setEditModalOpen(false);
        setSelectedSectionId(null);
      })
      .catch((error) => {
        showToast({ status: "error", message: error?.message || "Failed to update section" });
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(fetchSectionsThunk(newPage, rowsPerPage));
  };

  const columns = [
    { field: "sectionId", headerName: "Section ID" },
    { field: "name", headerName: "Section Name" },
  ];

  const filteredData = sections?.filter(
    (sec) =>
      String(sec.sectionId)?.includes(search.sectionId) &&
      sec.name?.toLowerCase().includes(search.sectionName)
  );

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
            onClick={() => setCreateModalOpen(true)}
          />
        </Box>

        <TableComponent
          columns={columns}
          data={filteredData}
          loading={loading}
          filterRow={{
            sectionId: (
              <TextField
                placeholder="Search Section Id"
                name="sectionId"
                value={search.sectionId}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            ),
            name: (
              <TextField
                placeholder="Search Section Name"
                name="sectionName"
                value={search.sectionName}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            ),
          }}
          customRowActions={(row) => (
            <>
              <Tooltip title="Edit Section">
                <IconButton
                  color="primary"
                  onClick={() => handleEditClick(row._id)}
                  aria-label="Edit Section"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Section">
                <IconButton
                  color="error"
                  onClick={() => handleDeleteClick(row._id)}
                  aria-label="Delete Section"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        />

        <Pagination
          page={page}
          limit={rowsPerPage}
          setLimit={setRowsPerPage}
          onPageChange={handlePageChange}
          totalPage={totalPages}
          total={totalCount}
        />
      </Paper>

      {/* Delete Modal */}
      <ReusableModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        actions={
          <>
            <Button title="Cancel" variant="outlined" onClick={() => setDeleteModalOpen(false)} />
            <Button
              title="Delete"
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            />
          </>
        }
      >
        <Typography>Are you sure you want to delete this section?</Typography>
      </ReusableModal>

      {/* Edit Modal */}
      <ReusableModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Section"
        actions={
          <>
            <Button title="Cancel" variant="outlined" onClick={() => setEditModalOpen(false)} />
            <Button title="Save" variant="contained" color="primary" onClick={handleConfirmEdit} />
          </>
        }
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Section ID"
            name="sectionId"
            value={editFormData.sectionId}
            onChange={handleEditInputChange}
            variant="outlined"
            fullWidth
            disabled
          />
          <TextField
            label="Section Name"
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
            variant="outlined"
            fullWidth
          />
        </Box>
      </ReusableModal>

      {/* Create Section Modal */}
      <ReusableModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Section"
        // no actions here because SectionForm handles buttons
      >
        <SectionForm
          onSuccess={() => {
            setCreateModalOpen(false);
            dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
          }}
          onCancel={() => setCreateModalOpen(false)}
        />
      </ReusableModal>
    </Box>
  );
};

export default SectionHome;
