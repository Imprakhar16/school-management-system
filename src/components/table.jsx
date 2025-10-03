import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const ReusableTable = ({ columns, rows, title }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      {title && (
        <Typography variant="h6" component="div" sx={{ p: 2 }}>
          {title}
        </Typography>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} align={col.align || "left"}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id || rowIndex}>
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align || "left"}>
                  {col.render ? col.render(row[col.id], row) : row[col.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
