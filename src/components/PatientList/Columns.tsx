import React from "react"
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"

export const Columns = ({ sortBy, sortOrder, onSort }) => {
  const createSortHandler = (field) => {
    onSort(field)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={sortBy === "firstName"}
            direction={sortBy === "firstName" ? sortOrder : "asc"}
            onClick={() => createSortHandler("firstName")}
          >
            First Name
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={sortBy === "lastName"}
            direction={sortBy === "lastName" ? sortOrder : "asc"}
            onClick={() => createSortHandler("lastName")}
          >
            Last Name
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={sortBy === "dateOfBirth"}
            direction={sortBy === "dateOfBirth" ? sortOrder : "asc"}
            onClick={() => createSortHandler("dateOfBirth")}
          >
            Date of Birth
          </TableSortLabel>
        </TableCell>
        <TableCell>Phone Number</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}
