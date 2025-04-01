import React, { useState, useEffect, ChangeEvent } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"

import { AddPatientDialogProps } from "../interfaces"

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({
  open,
  onClose,
  onAddPatient,
  newPatient,
  onPatientInputChange,
}) => {
  // Define error state for each field.
  const [errors, setErrors] = useState<{
    firstName: string
    lastName: string
    dateOfBirth: string
    phoneNumber: string
  }>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  })

  // Clear errors when the dialog closes.
  useEffect(() => {
    if (!open) {
      setErrors({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
      })
    }
  }, [open])

  // Validate a single field.
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          return "First Name is required."
        }
        return ""
      case "lastName":
        if (!value.trim()) {
          return "Last Name is required."
        }
        return ""
      case "dateOfBirth":
        if (!value) {
          return "Date of Birth is required."
        }
        return ""
      case "phoneNumber":
        if (!value.trim()) {
          return "Phone Number is required."
        } else {
          const digits = value.replace(/\D/g, "")
          if (digits.length < 10) {
            return "Phone Number must have at least 10 digits."
          }
        }
        return ""
      default:
        return ""
    }
  }

  // Validate all fields before submission.
  const validateAll = (): boolean => {
    const newErrors = {
      firstName: validateField("firstName", newPatient.firstName),
      lastName: validateField("lastName", newPatient.lastName),
      dateOfBirth: validateField("dateOfBirth", newPatient.dateOfBirth),
      phoneNumber: validateField("phoneNumber", newPatient.phoneNumber),
    }
    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  // Handle change: update parent's state and validate the field.
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    onPatientInputChange(event)
    const fieldError = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: fieldError }))
  }

  const handleSubmit = () => {
    if (validateAll()) {
      onAddPatient()
    }
  }

  const handleClose = () => {
    onClose()
    setErrors({ firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "" })
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newPatient.firstName}
          onChange={handleInputChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newPatient.lastName}
          onChange={handleInputChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={newPatient.dateOfBirth}
          onChange={handleInputChange}
          error={Boolean(errors.dateOfBirth)}
          helperText={errors.dateOfBirth}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={newPatient.phoneNumber}
          onChange={handleInputChange}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Patient
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPatientDialog
