import { useState } from "react"
import { Note } from "../interfaces"

export const useClinicalNotes = () => {
  const [clinicalNotes, setClinicalNotes] = useState<Note[]>([])

  /**
   * Adds a new note or updates an existing note based on appointmentId.
   * Expects a note object without an id; if a note already exists for the
   * given appointmentId, it will be updated (preserving the original id).
   */
  const addOrUpdateNote = (newNote: Omit<Note, "id">): void => {
    const noteIndex = clinicalNotes.findIndex(
      (note) => note.appointmentId === newNote.appointmentId
    )

    if (noteIndex >= 0) {
      // Update existing note while preserving the existing id.
      const updatedNotes = [...clinicalNotes]
      updatedNotes[noteIndex] = { ...newNote, id: clinicalNotes[noteIndex].id }
      setClinicalNotes(updatedNotes)
    } else {
      // Add new note with a generated id.
      const newNoteWithId: Note = {
        ...newNote,
        id: Date.now().toString(),
      }
      setClinicalNotes((prev) => [...prev, newNoteWithId])
    }
  }

  /**
   * Retrieves a clinical note for a specific appointment.
   *
   * @param appointmentId - The id of the appointment.
   * @returns The corresponding clinical note, or undefined if none exists.
   */
  const getAppointmentNote = (appointmentId: string): Note | undefined =>
    clinicalNotes.find((note) => note.appointmentId === appointmentId)

  return { clinicalNotes, addOrUpdateNote, getAppointmentNote }
}
