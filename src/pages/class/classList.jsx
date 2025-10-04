import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip, Paper, Typography, Box, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { classListThunk, deleteClassThunk } from "../../features/class/classThunk";
import ButtonComp from "../../components/button";
import TableComponent from "../../components/table";
import { renderArrayChips } from "../../helper/renderHelper";

export default function ClassList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes, loading } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(classListThunk(page, limit));
  }, [dispatch, limit, page]);

  const handleDelete = (id) => {
    dispatch(deleteClassThunk(id));
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
  ];

  return (
    // <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Class List
        </Typography>
        <ButtonComp
          title="Create Class"
          variant="contained"
          color="primary"
          onClick={() => navigate("/addClass")}
        />
      </Box>

      <TableComponent
        columns={columns}
        data={classes}
        loading={loading}
        // totalCount={totalCount}
        page={page}
        // rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
        // onRowsPerPageChange={(newRows) => {
        //   setRowsPerPage(newRows);
        // setPage(1);
        // }}
        customRowActions={(row) => (
          <>
            <Tooltip title="Edit Section">
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Section">
              <IconButton color="error" onClick={() => handleDelete(row._id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      />
    </Paper>
    // </Box>
  );
}
