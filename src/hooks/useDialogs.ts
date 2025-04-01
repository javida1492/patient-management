import { useState } from "react"

export const useDialogs = () => {
  const [openAddPatient, setOpenAddPatient] = useState(false)
  const [openAddAppointment, setOpenAddAppointment] = useState(false)
  const [openAddNote, setOpenAddNote] = useState(false)

  const openPatientDialog = () => setOpenAddPatient(true)
  const closePatientDialog = () => setOpenAddPatient(false)

  const openAppointmentDialog = () => setOpenAddAppointment(true)
  const closeAppointmentDialog = () => setOpenAddAppointment(false)

  const openNoteDialog = () => setOpenAddNote(true)
  const closeNoteDialog = () => setOpenAddNote(false)

  return {
    openAddPatient,
    openAddAppointment,
    openAddNote,
    openPatientDialog,
    closePatientDialog,
    openAppointmentDialog,
    closeAppointmentDialog,
    openNoteDialog,
    closeNoteDialog,
  }
}
