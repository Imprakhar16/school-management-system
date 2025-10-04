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
} from "@mui/material";

const TableComponent = ({
  columns = [],
  data = [],
  loading = false,
  totalCount = 0,
  page = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  customRowActions,
  emptyMessage = "No data found.",
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col?.field ?? Math.random()} sx={{ fontWeight: "bold" }}>
                {col?.headerName ?? ""}
              </TableCell>
            ))}
            {customRowActions && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
          </TableRow>
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
                {columns.map((col) => (
                  <TableCell key={col?.field ?? Math.random()}>
                    {col?.render ? col.render(row?.[col.field], row) : row?.[col.field]}
                  </TableCell>
                ))}
                {customRowActions && <TableCell>{customRowActions(row)}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalCount || 0}
        page={Math.max(page - 1, 0)}
        onPageChange={(e, newPage) => onPageChange(newPage + 1)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};

export default TableComponent;
