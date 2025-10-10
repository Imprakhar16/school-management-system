import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Paper, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";
import { deleteSectionThunk, fetchSectionsThunk } from "../../features/section/sectionThunk";
import { showToast } from "../../components/toaster";
import TableComponent from "../../components/table";
import ReusableModal from "../../components/modal";
import ButtonComp from "../../components/button";
import Pagination from "../../components/pagination";

const SectionHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sections, loading, totalCount, totalPages } = useSelector((state) => state.sections);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState({ sectionId: "", sectionName: "" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchSectionsThunk({ page, limit: rowsPerPage, search: debouncedSearch }));
  }, [page, rowsPerPage, debouncedSearch, dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedSectionId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedSectionId) return;

    dispatch(deleteSectionThunk(selectedSectionId))
      .unwrap()
      .then(() => {
        showToast({
          status: "success",
          message: "Section deleted successfully",
        });
        dispatch(
          fetchSectionsThunk({
            page,
            limit: rowsPerPage,
            search: debouncedSearch,
          })
        );
      })
      .catch((error) => {
        showToast({
          status: "error",
          message: error?.message || "Failed to delete section",
        });
      })
      .finally(() => {
        setDeleteModalOpen(false);
        setSelectedSectionId(null);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [{ field: "name", headerName: "Section Name" }];

  const filteredData = sections?.filter(
    (sec) =>
      String(sec?.sectionId)?.includes(search?.sectionId) &&
      sec?.name?.toLowerCase().includes(search.sectionName.toLowerCase())
  );

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Sections List
          </Typography>
          <ButtonComp
            title="Create Section"
            variant="contained"
            color="primary"
            onClick={() => navigate("/sections/form", { state: null })}
            startIcon={<AddIcon />}
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
                  onClick={() => navigate("/sections/form", { state: { section: row } })}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Section">
                <IconButton color="error" onClick={() => handleDeleteClick(row._id)}>
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

      {/* Delete Confirmation Modal */}
      <ReusableModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        actions={
          <>
            <ButtonComp
              title="Cancel"
              variant="outlined"
              onClick={() => setDeleteModalOpen(false)}
              size="small"
            />
            <ButtonComp
              title="Delete"
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
              size="small"
            />
          </>
        }
      >
        <Typography>Are you sure you want to delete this section?</Typography>
      </ReusableModal>
    </Box>
  );
};

export default SectionHome;
