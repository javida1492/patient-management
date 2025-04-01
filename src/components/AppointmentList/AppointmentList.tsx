import React, { useState, useEffect, useMemo } from "react"
import {
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  Paper,
  Card,
  CardContent,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Appointment, AppointmentListProps, Patient } from "../../interfaces"
import { AppointmentRow } from "./AppointmentRow"
import { Columns } from "./Columns"
import { normalizePhoneNumber } from "../../utils"
import { fetchAppointments } from "../../services/api"

type Props = Omit<
  AppointmentListProps,
  "appointments" | "getPatientAppointments"
>

const AppointmentList: React.FC<Props> = ({
  selectedPatient,
  onAddAppointment,
  onAddNote,
  patients,
}) => {
  // Local state to hold appointments fetched from the API.
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointments()
        setAppointments(data)
      } catch (error) {
        console.error("Error fetching appointments:", error)
      }
    }
    fetchData()
  }, [])

  // Determine which appointments to display:
  const displayedAppointments = useMemo(() => {
    if (selectedPatient) {
      return appointments.filter(
        (appointment) => appointment.patientId === selectedPatient.id
      )
    }
    return appointments
  }, [appointments, selectedPatient])

  // Precompute a mapping from patient ID to full name.
  const patientMap = useMemo<Record<string, string>>(() => {
    return patients.reduce((acc, patient: Patient) => {
      acc[patient.id] = `${patient.firstName} ${patient.lastName}`
      return acc
    }, {} as Record<string, string>)
  }, [patients])

  const selectedPatientName =
    selectedPatient &&
    `${selectedPatient.firstName} ${selectedPatient.lastName}`

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">
          {selectedPatient
            ? `Appointments for ${selectedPatientName}`
            : "All Appointments"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddAppointment}
        >
          Add Appointment
        </Button>
      </Box>

      {selectedPatient && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Patient Details</Typography>
              <Typography>
                Name: {selectedPatient.firstName} {selectedPatient.lastName}
              </Typography>
              <Typography>
                DOB:{" "}
                {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
              </Typography>
              <Typography>
                Phone: {normalizePhoneNumber(selectedPatient.phoneNumber)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <TableContainer>
        <Table>
          <Columns />
          <AppointmentRow
            displayedAppointments={displayedAppointments}
            patientMap={patientMap}
            onAddNote={onAddNote}
          />
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default AppointmentList
