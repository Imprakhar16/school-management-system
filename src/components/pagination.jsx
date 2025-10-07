import React from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Pagination = ({ page, total, limit, setLimit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        gap: 2,
      }}
    >
      {/* Left side: Rows per page */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Rows per page:
        </Typography>
        <FormControl size="small">
          <Select
            value={limit}
            onChange={(e) => {
              const selectedLimit = Number(e.target.value);
              setLimit(selectedLimit);
              onPageChange(1); // Reset to first page when limit changes
            }}
          >
            {[5, 10, 15, 20, 25, 30].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          of {total}
        </Typography>
      </Stack>

      {/* Right side: Navigation */}
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton onClick={() => onPageChange(page - 1)} disabled={page <= 1} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="body2">
          {page} of {totalPages}
        </Typography>
        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          color="primary"
        >
          <ArrowForward />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Pagination;
