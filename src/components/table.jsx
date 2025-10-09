import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";

import Pagination from "./pagination";

const TableComponent = ({
  columns = [],
  data = [],
  loading = false,
  customRowActions,
  filterRow,
  emptyMessage = "No data found.",
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((col) => (
              <TableCell key={col?.field ?? Math.random()} sx={{ fontWeight: "bold" }}>
                {col?.headerName ?? ""}
              </TableCell>
            ))}
            {customRowActions && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
          </TableRow>

          {/* 🔽 Filter row just under the headers */}
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
          ) : !data || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (customRowActions ? 1 : 0)} align="center">
                <Typography>{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
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
