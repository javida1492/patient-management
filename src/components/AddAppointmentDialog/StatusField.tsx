import React from "react"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material"

import { APPOINTMENT_STATUS } from "../../constants"
import { StatusFieldProps } from "./interfaces"

export const StatusField: React.FC<StatusFieldProps> = ({
  newAppointment,
  onAppointmentInputChange,
  error = false,
}) => {
  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>Status</InputLabel>
      <Select
        name="status"
        value={newAppointment.status}
        onChange={(event: SelectChangeEvent<string>, child) => {
          onAppointmentInputChange(
            event as unknown as React.ChangeEvent<{
              name?: string
              value: unknown
            }>
          )
        }}
        label="Status"
      >
        {APPOINTMENT_STATUS.map((status: string) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
