import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

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
  const [isSorted, setIsSorted] = useState(false);

  const handleSort = () => {
    if (columns.length === 0 || data.length === 0) return;

    const firstColumn = columns[0];
    const sorted = [...data].sort((a, b) => {
      const aVal = a[firstColumn.field];
      const bVal = b[firstColumn.field];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      return aStr.localeCompare(bStr);
    });

    setSortedData(sorted);
    setIsSorted(true);

    if (onDataChange) {
      onDataChange(sorted);
    }
  };

  const displayData = isSorted ? sortedData : data;

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<ArrowUpward />}
          onClick={handleSort}
          sx={{
            textTransform: "none",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Sort A-Z
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((col) => (
              <TableCell key={col?.field ?? Math.random()} sx={{ fontWeight: "bold" }}>
                {col?.headerName ? String(col.headerName).toUpperCase() : ""}
              </TableCell>
            ))}
            {customRowActions && <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>}
          </TableRow>

          {filterRow && (
            <TableRow
              sx={{
                backgroundColor: "#fafafa",
              }}
            >
              {columns?.map((col) => (
                <TableCell
                  key={col?.field ?? Math.random()}
                  sx={{
                    py: 0.5,
                  }}
                >
                  {filterRow[col.field] ? (
                    <Box
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 30,
                          fontSize: 13,
                          borderRadius: 1.5,
                          "& fieldset": {
                            borderColor: "#ddd",
                          },
                          "&:hover fieldset": {
                            borderColor: "#bdbdbd",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#90caf9",
                          },
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
          ) : !displayData || displayData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (customRowActions ? 1 : 0)} align="center">
                <Typography>{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            displayData.map((row) => (
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
    </>
  );
};

export default TableComponent;
