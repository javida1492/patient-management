import React from "react"
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { formatDate } from "../utils"
import {
  ClinicalDocumentationProps,
  Note,
  Appointment,
  Patient,
} from "../interfaces"

const ClinicalDocumentation: React.FC<ClinicalDocumentationProps> = ({
  clinicalNotes,
  appointments,
  patients,
  onAddNote,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Clinical Documentation
      </Typography>

      {clinicalNotes.length > 0 ? (
        <List>
          {clinicalNotes.map((note: Note) => {
            const appointment = appointments.find(
              (a: Appointment) => a.id === note.appointmentId
            )
            if (!appointment) return null

            const patient = patients.find(
              (p: Patient) => p.id === appointment.patientId
            )
            const patientName = patient
              ? `${patient.firstName} ${patient.lastName}`
              : "Unknown"

            return (
              <ListItem key={note.id} divider>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div">
                      {`Appointment Details: ${patientName} - ${
                        appointment.type
                      } - ${formatDate(appointment.date)}`}
                    </Typography>
                  }
                  secondary={
                    <Box mt={1}>
                      <Typography variant="body2" component="div">
                        <strong>Chief Complaint:</strong> {note.chiefComplaint}
                      </Typography>
                      <Typography variant="body2" component="div">
                        <strong>Treatment Plan:</strong> {note.treatmentPlan}
                      </Typography>
                      <Typography variant="body2" component="div">
                        <strong>Progress:</strong> {note.progress}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => onAddNote(appointment)}
                        sx={{ mt: 1 }}
                      >
                        Edit Note
                      </Button>
                    </Box>
                  }
                />
              </ListItem>
            )
          })}
        </List>
      ) : (
        <Typography variant="body1">
          No clinical notes available. Add notes to appointments from the
          Appointments tab.
        </Typography>
      )}
    </Box>
  )
}

export default ClinicalDocumentation
