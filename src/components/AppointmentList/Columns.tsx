import React from "react"
import { TableHead, TableRow, TableCell } from "@mui/material"

export const Columns = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Patient</TableCell>
        <TableCell>Date & Time</TableCell>
        <TableCell>Start Time</TableCell>
        <TableCell>End Time</TableCell>
        <TableCell>Provider</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}
