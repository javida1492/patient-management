import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material"
import { formatDate } from "../utils"
import { AddEditNoteDialogProps, Patient } from "../interfaces"
import { addNote } from "../services/api" // Ensure this API function is defined

const AddEditNoteDialog: React.FC<AddEditNoteDialogProps> = ({
  open,
  onClose,
  onAddNote, // Parent callback (e.g., refresh notes list)
  newNote, // New note data of type NewNote (without an id)
  onNoteInputChange,
  selectedAppointment,
  getAppointmentNote,
  patients,
}) => {
  // Determine if we are editing an existing note by checking if one exists for the selected appointment.
  const isEditing = !!(
    selectedAppointment && getAppointmentNote(selectedAppointment.id)
  )

  // Lookup the patient by the appointment's patientId.
  const patient = patients.find(
    (p: Patient) => p.id === selectedAppointment?.patientId
  )
  const patientName = patient
    ? `${patient.firstName} ${patient.lastName}`
    : "Unknown"

  const handleSubmit = async () => {
    try {
      // For new notes, call the API to add the note.
      // (If editing, you'd call an update API function instead.)
      await addNote(newNote)
      // After a successful API call, invoke the parent's callback.
      onAddNote()
    } catch (error) {
      console.error("Error adding note:", error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditing ? "Edit Clinical Note" : "Add Clinical Note"}
      </DialogTitle>
      <DialogContent>
        {selectedAppointment && (
          <Box mb={2}>
            <Typography variant="subtitle1">
              Appointment Details: {patientName} - {selectedAppointment.type} -{" "}
              {formatDate(selectedAppointment.date)}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Box>
        )}
        <TextField
          autoFocus
          margin="dense"
          name="chiefComplaint"
          label="Chief Complaint"
          type="text"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={newNote.chiefComplaint}
          onChange={onNoteInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="treatmentPlan"
          label="Treatment Plan"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={newNote.treatmentPlan}
          onChange={onNoteInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="progress"
          label="Progress Notes"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={newNote.progress}
          onChange={onNoteInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? "Update Note" : "Save Note"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEditNoteDialog
