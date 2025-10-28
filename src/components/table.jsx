import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const TableComponent = ({
  columns = [],
  data = [],
  loading = false,
  customRowActions,
  filterRow,
  emptyMessage = "No data found.",
  onDataChange,
}) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ field: null, order: null });

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (field, order) => {
    if (data.length === 0) return;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (!isNaN(aVal) && !isNaN(bVal)) {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      return order === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });

    setSortedData(sorted);
    setSortConfig({ field, order });

    if (onDataChange) {
      onDataChange(sorted);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns?.map((col) => (
            <TableCell
              key={col?.field ?? Math.random()}
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                {/* Header Name */}
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {col?.headerName ? String(col.headerName).toUpperCase() : ""}
                </Typography>

                {/* Add sort icons for all columns */}
                <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleSort(col.field, "asc")}
                    sx={{
                      p: 0,
                      color:
                        sortConfig.field === col.field && sortConfig.order === "asc"
                          ? "#1976d2"
                          : "#9e9e9e",
                      "&:hover": { color: "#1976d2" },
                    }}
                  >
                    <ArrowUpward fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleSort(col.field, "desc")}
                    sx={{
                      p: 0,
                      ml: 0.2,
                      color:
                        sortConfig.field === col.field && sortConfig.order === "desc"
                          ? "#1976d2"
                          : "#9e9e9e",
                      "&:hover": { color: "#1976d2" },
                    }}
                  >
                    <ArrowDownward fontSize="inherit" />
                  </IconButton>
                </Box>
              </Box>
            </TableCell>
          ))}
          {customRowActions && <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>}
        </TableRow>

        {filterRow && (
          <TableRow sx={{ backgroundColor: "#fafafa" }}>
            {columns?.map((col) => (
              <TableCell key={col?.field ?? Math.random()} sx={{ py: 0.5 }}>
                {filterRow[col.field] ? (
                  <Box
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 30,
                        fontSize: 13,
                        borderRadius: 1.5,
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#bdbdbd" },
                        "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                      },
                      "& input::placeholder": {
                        fontSize: 12,
                        color: "#9e9e9e",
                      },
                    }}
                  >
                    {filterRow[col.field]}
                  </Box>
                ) : null}
              </TableCell>
            ))}
            {customRowActions && <TableCell />}
          </TableRow>
        )}
      </TableHead>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + (customRowActions ? 1 : 0)}
              align="center"
              sx={{ py: 5 }}
            >
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : !sortedData || sortedData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length + (customRowActions ? 1 : 0)} align="center">
              <Typography>{emptyMessage}</Typography>
            </TableCell>
          </TableRow>
        ) : (
          sortedData.map((row) => (
            <TableRow key={row?._id ?? Math.random()}>
              {columns?.map((col) => (
                <TableCell key={col?.field ?? Math.random()}>
                  {col?.render ? col.render(row) : (row?.[col.field] ?? "—")}
                </TableCell>
              ))}
              {customRowActions && <TableCell>{customRowActions(row)}</TableCell>}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
