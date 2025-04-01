import React from "react"
import { TableBody, TableCell, TableRow, Button } from "@mui/material"
import { formatDate, normalizePhoneNumber } from "../../utils"

import { PatientRowProps } from "../../interfaces"

export const PatientRow: React.FC<PatientRowProps> = ({
  patients,
  onSelectPatient,
}) => {
  return (
    <TableBody>
      {patients.map((patient) => (
        <TableRow key={patient.id}>
          <TableCell>{patient.firstName}</TableCell>
          <TableCell>{patient.lastName}</TableCell>
          <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
          <TableCell>{normalizePhoneNumber(patient.phoneNumber)}</TableCell>
          <TableCell>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onSelectPatient(patient)}
            >
              View Details
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
