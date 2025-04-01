import React, { useState, useEffect } from "react"
import { Container, Paper, Tabs, Tab } from "@mui/material"

import { Patient, Note } from "./interfaces"

import {
  Header,
  PatientList,
  ClinicalDocumentation,
  AddPatientDialog,
  AppointmentList,
  AddAppointmentDialog,
  AddEditNoteDialog,
} from "./components"

import {
  usePatients,
  useAppointments,
  useClinicalNotes,
  useDialogs,
} from "./hooks"

import {
  initialAppointmentState,
  initialNoteState,
  initialPatientState,
} from "./initialStates"

import { fetchNotes } from "./services/api"

function App() {
  // Tab state: 0 - Patients, 1 - Appointments, 2 - Clinical Documentation
  const [tabValue, setTabValue] = useState<number>(0)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  // Form state hooks for dialog forms
  const [newPatient, setNewPatient] = useState(initialPatientState)
  const [newAppointment, setNewAppointment] = useState(initialAppointmentState)
  const [newNote, setNewNote] = useState(initialNoteState)

  // State for clinical notes fetched from the API.
  const [clinicalNotes, setClinicalNotes] = useState<Note[]>([])

  // Fetch clinical notes once when App mounts.
  useEffect(() => {
    const getNotes = async () => {
      try {
        const data: Note[] = await fetchNotes()
        setClinicalNotes(data)
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
    }
    getNotes()
  }, [])

  // Custom hooks for business logic
  const { patients, addNewPatient } = usePatients()
  const { appointments, addAppointment } = useAppointments(patients)
  const { addOrUpdateNote, getAppointmentNote } = useClinicalNotes()

  const {
    openAddPatient,
    openAddAppointment,
    openAddNote,
    openPatientDialog,
    closePatientDialog,
    openAppointmentDialog,
    closeAppointmentDialog,
    openNoteDialog,
    closeNoteDialog,
  } = useDialogs()

  const handlePatientInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, value } = e.target
    setNewPatient((prev) => ({ ...prev, [name]: value }))
  }

  const handleAppointmentInputChange: React.ChangeEventHandler<
    HTMLInputElement | { name?: string; value: unknown }
  > = (e) => {
    const { name, value } = e.target
    setNewAppointment((prev) => ({ ...prev, [name as string]: value }))
  }

  const handleNoteInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, value } = e.target
    setNewNote((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitPatient = async () => {
    await addNewPatient(newPatient)
    setNewPatient(initialPatientState)
    handleClosePatientDialog()
  }

  const handleSubmitAppointment = () => {
    addAppointment(newAppointment)
    setNewAppointment(initialAppointmentState)
    handleCloseAppointmentDialog()
  }

  const handleSubmitNote = () => {
    addOrUpdateNote(newNote)
    setNewNote(initialNoteState)
    handleCloseNoteDialog()
    // Optionally, refresh clinical notes after adding/updating a note.
    // You could re-fetch here if desired.
  }

  // --- Patient selection and note dialog handling ---
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setTabValue(1)
  }

  const handleOpenNoteDialog = (appointment: any) => {
    setSelectedAppointment(appointment)
    const existingNote = getAppointmentNote(appointment.id)
    if (existingNote) {
      setNewNote(existingNote)
    } else {
      setNewNote({
        appointmentId: appointment.id,
        chiefComplaint: "",
        treatmentPlan: "",
        progress: "",
      })
    }
    openNoteDialog()
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSelectedPatient(null)
  }

  const handleClosePatientDialog = () => {
    setNewPatient(initialPatientState)
    closePatientDialog()
  }

  const handleCloseAppointmentDialog = () => {
    setNewAppointment(initialAppointmentState)
    closeAppointmentDialog()
  }

  const handleCloseNoteDialog = () => {
    setNewNote(initialNoteState)
    closeNoteDialog()
  }

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Patients" />
            <Tab label="Appointments" />
            <Tab label="Clinical Documentation" />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <PatientList
            patients={patients}
            onAddPatient={openPatientDialog}
            onSelectPatient={handleSelectPatient}
          />
        )}

        {tabValue === 1 && (
          <AppointmentList
            patients={patients}
            selectedPatient={selectedPatient}
            onAddAppointment={openAppointmentDialog}
            onAddNote={handleOpenNoteDialog}
          />
        )}

        {tabValue === 2 && (
          <ClinicalDocumentation
            clinicalNotes={clinicalNotes}
            appointments={appointments}
            onAddNote={handleOpenNoteDialog}
            patients={patients}
          />
        )}

        <AddPatientDialog
          open={openAddPatient}
          onClose={handleClosePatientDialog}
          onAddPatient={handleSubmitPatient}
          newPatient={newPatient}
          onPatientInputChange={handlePatientInputChange}
        />

        <AddAppointmentDialog
          open={openAddAppointment}
          onClose={handleCloseAppointmentDialog}
          onAddAppointment={handleSubmitAppointment}
          newAppointment={newAppointment}
          onAppointmentInputChange={handleAppointmentInputChange}
          patients={patients}
        />

        <AddEditNoteDialog
          open={openAddNote}
          onClose={handleCloseNoteDialog}
          onAddNote={handleSubmitNote}
          newNote={newNote}
          onNoteInputChange={handleNoteInputChange}
          selectedAppointment={selectedAppointment}
          getAppointmentNote={getAppointmentNote}
          patients={patients}
        />
      </Container>
    </div>
  )
}

export default App
