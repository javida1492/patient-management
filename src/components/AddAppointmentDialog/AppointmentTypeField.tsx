import React from "react"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material"

import { APPOINTMENT_TYPES } from "../../constants"

import { AppointmentTypeFieldProps } from "./interfaces"

export const AppointmentTypeField: React.FC<AppointmentTypeFieldProps> = ({
  newAppointment,
  onAppointmentInputChange,
  error = false,
}) => {
  return (
    <FormControl fullWidth margin="dense" sx={{ mb: 2 }} error={error}>
      <InputLabel>Appointment Type</InputLabel>
      <Select
        name="type"
        value={newAppointment.type}
        onChange={(event: SelectChangeEvent<string>, child) => {
          onAppointmentInputChange(
            event as unknown as React.ChangeEvent<{
              name?: string
              value: unknown
            }>
          )
        }}
        label="Appointment Type"
      >
        {APPOINTMENT_TYPES.map((type: string) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
