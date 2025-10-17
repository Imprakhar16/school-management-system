import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ButtonComp from "../../components/button";
import TableComponent from "../../components/table";
import Pagination from "../../components/pagination";
import { getExamTypeThunk } from "../../features/examType/examTypeThunk";

export default function ExamTypeList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState({
    searchName: "",
    searchActive: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { examTypes, loading, totalCount, totalPages } = useSelector((state) => state.examType);

  useEffect(() => {
    dispatch(getExamTypeThunk({ page, limit }));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    { field: "name", headerName: "NAME" },
    {
      field: "isActive",
      headerName: "ACTIVE",
      render: (row) => (row.isActive ? "Active" : "InActive"),
    },
  ];

  const filteredData = examTypes?.filter((data) => {
    const matchName = data?.name?.toLowerCase().includes(search.searchName.toLowerCase());
    const matchActive =
      search.searchActive === "" ? true : data.isActive === (search.searchActive === "true");

    return matchName && matchActive;
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(getExamTypeThunk({ page: newPage, limit: limit }));
  };

  return (
    <div>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Exam Type List
          </Typography>
          <ButtonComp
            title="Create Exam-Type"
            variant="contained"
            color="primary"
            onClick={() => navigate("/createExam-type")}
            fullwidth={false}
            startIcon={<AddIcon />}
          />
        </Box>

        <TableComponent
          columns={columns}
          data={filteredData}
          loading={loading}
          onChange={handleChange}
          filterRow={{
            name: (
              <TextField
                placeholder="Search ExamType Name"
                name="searchName"
                value={search.searchName}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            ),
            isActive: (
              <TextField
                select
                placeholder="Search Status"
                name="searchActive"
                value={search.searchActive}
                onChange={handleChange}
                size="small"
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            ),
          }}
          customRowActions={(row) => (
            <>
              <Box sx={{ display: "flex", columnGap: 2 }}>
                <Tooltip title="Edit Section">
                  <IconButton
                    color="primary"
                    onClick={() => navigate("/createExam-type", { state: { examTypeData: row } })}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete Section">
                  <IconButton color="error">
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
      </Paper>
    </div>
  );
}
