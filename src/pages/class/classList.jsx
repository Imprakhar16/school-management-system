import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip, Paper, Typography, Box, IconButton, TextField, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { classListThunk, deleteClassThunk } from "../../features/class/classThunk";
import { fetchSectionsThunk } from "../../features/section/sectionThunk";
import { fetchAllSubjectsThunk } from "../../features/subjects/subjectThunk";
import { fetchAllTeachersThunk } from "../../features/teachers/teacherThunk";
import ButtonComp from "../../components/button";
import TableComponent from "../../components/table";
import { renderArrayChips } from "../../helper/renderHelper";
import { convertToIds } from "../../helper/filterHelper.js";
import Pagination from "../../components/pagination";
import AddIcon from "@mui/icons-material/Add";
import ReusableModal from "../../components/modal";
import { showToast } from "../../components/toaster";
import useDebounce from "../../hooks/useDebounce";

export default function ClassList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes, loading, totalPages, totalCount } = useSelector((state) => state.class);

  const { data: subjects } = useSelector((state) => state.subject);
  const { sections } = useSelector((state) => state.sections);
  const { teachers } = useSelector((state) => state.teacher);

  const [search, setSearch] = useState({
    name: "",
    subjectsId: "",
    sectionId: "",
    classincharge: "",
  });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchSectionsThunk(1, 100));
    dispatch(fetchAllSubjectsThunk(1, 100));
    dispatch(fetchAllTeachersThunk(1, 100));
  }, [dispatch]);

  useEffect(() => {
    const filters = convertToIds(debouncedSearch, {
      subjects,
      sections,
      teachers,
    });
    dispatch(classListThunk({ page, limit, search: filters }));
  }, [dispatch, limit, page, debouncedSearch, subjects, sections, teachers]);

  const handleDelete = (id) => {
    setSelectedClassId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedClassId) return;
    dispatch(deleteClassThunk(selectedClassId))
      .unwrap()
      .then(() => {
        dispatch(classListThunk({ page, limit: limit }));
      })
      .catch((error) => {
        showToast({ status: "error", message: error?.message || "Failed to delete Class" });
      })
      .finally(() => {
        setDeleteModalOpen(false);
        setSelectedClassId(null);
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
    dispatch(classListThunk({ page: newPage, limit }));
  };

  const columns = [
    { field: "name", headerName: "CLASSNAME" },
    {
      field: "subjects",
      headerName: "SUBJECTS",
      render: (row) => renderArrayChips(row.subjects, (sub) => sub.name || sub.code),
    },
    {
      field: "sections",
      headerName: "SECTIONS",
      render: (row) => renderArrayChips(row.sections, (sec) => sec.name),
    },
    {
      field: "classincharge",
      headerName: "CLASSINCHARGE",
      render: (row) =>
        row.classincharge ? `${row.classincharge.firstname} ${row.classincharge.lastname}` : "N/A",
    },
  ];
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Class List
        </Typography>
        <ButtonComp
          title="Create Class"
          variant="contained"
          color="primary"
          onClick={() => navigate("/create-class")}
          fullwidth={false}
          startIcon={<AddIcon />}
        />
      </Box>

      <TableComponent
        columns={columns}
        data={classes}
        loading={loading}
        onChange={handleChange}
        filterRow={{
          name: (
            <TextField
              placeholder="Search Class"
              name="name"
              value={search.name}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          subjects: (
            <TextField
              placeholder="Search Subject"
              name="subjectsId"
              value={search.subjectsId}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          sections: (
            <TextField
              placeholder="Search Section"
              name="sectionId"
              value={search.sectionId}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
          classincharge: (
            <TextField
              placeholder="Search Incharge"
              name="classincharge"
              value={search.classincharge}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ),
        }}
        customRowActions={(row) => (
          <>
            <Box sx={{ display: "flex", columnGap: 2 }}>
              <Tooltip title="Edit Section">
                <IconButton color="primary" onClick={() => navigate(`/editClass/${row._id}`)}>
                  <Edit />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Section">
                <IconButton color="error" onClick={() => handleDelete(row._id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
      />

      <Pagination
        page={page}
        limit={limit}
        setLimit={setLimit}
        onPageChange={handlePageChange}
        totalPage={totalPages}
        total={totalCount}
      />

      <ReusableModal
        open={deleteModalOpen}
        onClose={() => setSelectedClassId(false)}
        title="Confirm Deletion"
        actions={
          <>
            <ButtonComp
              title="cancel"
              variant="contained"
              onClick={() => setDeleteModalOpen(false)}
            />
            <ButtonComp
              title="delete"
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            />
          </>
        }
      >
        <Typography>Are you sure you want to delete this class?</Typography>
      </ReusableModal>
    </Paper>
  );
}
