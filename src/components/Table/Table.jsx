import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const BasicTable = ({ data, rowData }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: data.headerBgColor || "",
      color: data.headerTextColor || "",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: data.oddRowBgColor || theme.palette.action.hover,
    },
    "&:nth-of-type(even)": {
      backgroundColor: data.evenRowBgColor,
    },
    "&:last-child td": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            {data.headers.map((header, index) => {
              return (
                <StyledTableCell align={header.align || "left"} key={index}>
                  {header.title}
                </StyledTableCell>
              );
            })}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={index}
            >
              {row.map((value, index) => {
                return (
                  <StyledTableCell
                    align={data.headers[index].align || "left"}
                    key={index}
                  >
                    {value}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
