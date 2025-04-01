import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"

import { AppointmentTypeField } from "./AppointmentTypeField"
import { ProviderField } from "./ProviderField"
import { StatusField } from "./StatusField"
import { PatientField } from "./PatientField"

import { AddAppointmentDialogProps } from "./interfaces"
import { addAppointment } from "../../services/api"

const AddAppointmentDialog: React.FC<AddAppointmentDialogProps> = ({
  open,
  onClose,
  onAddAppointment,
  newAppointment,
  onAppointmentInputChange,
  patients,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    let tempErrors: Record<string, string> = {}

    if (!newAppointment.patientId) tempErrors.patientId = "Patient is required"
    if (!newAppointment.date)
      tempErrors.appointmentDate = "Appointment Date is required"
    if (!newAppointment.startTime)
      tempErrors.startTime = "Start time is required"
    if (!newAppointment.endTime) tempErrors.endTime = "End time is required"
    if (!newAppointment.providerId) tempErrors.provider = "Provider is required"
    if (!newAppointment.type) tempErrors.type = "Appointment type is required"
    if (!newAppointment.status) tempErrors.status = "Status is required"

    if (newAppointment.startTime && newAppointment.endTime) {
      if (newAppointment.startTime >= newAppointment.endTime) {
        tempErrors.startTime = "Start time must be before end time"
        tempErrors.endTime = "End time must be after start time"
      }
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validate()) {
      try {
        // Destructure only the fields from NewAppointment
        const {
          patientId,
          date,
          startTime,
          endTime,
          providerId,
          type,
          status,
        } = newAppointment
        await addAppointment({
          patientId,
          date,
          startTime,
          endTime,
          providerId,
          type,
          status,
        })
        setErrors({})
        onAddAppointment()
      } catch (error) {
        console.error("Error adding appointment:", error)
      }
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Appointment</DialogTitle>
      <DialogContent>
        <PatientField
          newAppointment={newAppointment}
          onAppointmentInputChange={onAppointmentInputChange}
          patients={patients}
          error={!!errors.patientId}
          helperText={errors.patientId}
        />

        <TextField
          margin="dense"
          name="date"
          label="Appointment Date"
          type="date"
          fullWidth
          variant="outlined"
          slotProps={{ inputLabel: { shrink: true } }}
          value={newAppointment.date}
          onChange={onAppointmentInputChange}
          error={!!errors.appointmentDate}
          helperText={errors.appointmentDate}
          sx={{ mb: 2 }}
        />

        <TextField
          margin="dense"
          name="startTime"
          label="Start Time"
          type="time"
          fullWidth
          variant="outlined"
          slotProps={{ inputLabel: { shrink: true } }}
          value={newAppointment.startTime}
          onChange={onAppointmentInputChange}
          error={!!errors.startTime}
          helperText={errors.startTime}
          sx={{ mb: 2 }}
        />

        <TextField
          margin="dense"
          name="endTime"
          label="End Time"
          type="time"
          fullWidth
          variant="outlined"
          slotProps={{ inputLabel: { shrink: true } }}
          value={newAppointment.endTime}
          onChange={onAppointmentInputChange}
          error={!!errors.endTime}
          helperText={errors.endTime}
          sx={{ mb: 2 }}
        />

        <ProviderField
          newAppointment={newAppointment}
          onAppointmentInputChange={onAppointmentInputChange}
          error={!!errors.provider}
        />

        <AppointmentTypeField
          newAppointment={newAppointment}
          onAppointmentInputChange={onAppointmentInputChange}
          error={!!errors.type}
        />

        <StatusField
          newAppointment={newAppointment}
          onAppointmentInputChange={onAppointmentInputChange}
          error={!!errors.status}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Appointment
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddAppointmentDialog
