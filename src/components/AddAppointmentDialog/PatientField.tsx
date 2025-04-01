import React from "react"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material"

import { PatientFieldProps } from "./interfaces"

export const PatientField: React.FC<PatientFieldProps> = ({
  newAppointment,
  onAppointmentInputChange,
  patients,
  error = false,
  helperText = "",
}) => {
  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>Patient</InputLabel>
      <Select
        name="patientId"
        value={newAppointment.patientId}
        onChange={(event: SelectChangeEvent<string>, child) => {
          onAppointmentInputChange(
            event as unknown as React.ChangeEvent<{
              name?: string
              value: unknown
            }>
          )
        }}
        label="Patient"
      >
        {patients.map((patient) => (
          <MenuItem key={patient.id} value={patient.id}>
            {patient.firstName + " " + patient.lastName}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
