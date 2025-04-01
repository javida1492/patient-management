import { API_ROOT_URL } from "../constants"
import {
  Patient,
  Provider,
  Appointment,
  Note,
  NewAppointment,
} from "../interfaces"

/**
 * Fetches patients from the API.
 *
 * @returns {Promise<Patient[]>} A promise that resolves to an array of patients.
 */
export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${API_ROOT_URL}patients`)
  if (!response.ok) {
    throw new Error("Error fetching patients")
  }
  return response.json()
}

/**
 * Adds a new patient by POSTing to the API.
 *
 * @param newPatient - The new patient object (without an id).
 * @returns {Promise<Patient>} A promise that resolves to the created patient.
 */
export const addPatient = async (
  newPatient: Omit<Patient, "id">
): Promise<Patient> => {
  const response = await fetch(`${API_ROOT_URL}patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPatient),
  })
  if (!response.ok) {
    throw new Error("Error adding patient")
  }
  return response.json()
}

// Providers API
export const fetchProviders = async (): Promise<Provider[]> => {
  const response = await fetch(`${API_ROOT_URL}providers`)
  if (!response.ok) {
    throw new Error("Error fetching providers")
  }
  return response.json()
}

// Appointments API
export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await fetch(`${API_ROOT_URL}appointments`)
  if (!response.ok) {
    throw new Error("Error fetching appointments")
  }
  return response.json()
}

export const addAppointment = async (
  newAppointment: NewAppointment
): Promise<Appointment> => {
  const response = await fetch(`${API_ROOT_URL}appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAppointment),
  })
  if (!response.ok) {
    throw new Error("Error adding appointment")
  }
  return response.json()
}

export const updateAppointment = async (
  appointmentId: string,
  updatedData: Partial<Appointment>
): Promise<Appointment> => {
  const response = await fetch(`${API_ROOT_URL}appointments/${appointmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
  if (!response.ok) {
    throw new Error("Error updating appointment")
  }
  return response.json()
}

export const deleteAppointment = async (
  appointmentId: string
): Promise<void> => {
  const response = await fetch(`${API_ROOT_URL}appointments/${appointmentId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Error deleting appointment")
  }
}

// Notes API
export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${API_ROOT_URL}notes`)
  if (!response.ok) {
    throw new Error("Error fetching notes")
  }
  return response.json()
}

export const addNote = async (newNote: Omit<Note, "id">): Promise<Note> => {
  const response = await fetch(`${API_ROOT_URL}notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
  if (!response.ok) {
    throw new Error("Error adding note")
  }
  return response.json()
}

export const updateNote = async (
  noteId: string,
  updatedData: Partial<Note>
): Promise<Note> => {
  const response = await fetch(`${API_ROOT_URL}notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
  if (!response.ok) {
    throw new Error("Error updating note")
  }
  return response.json()
}

export const deleteNote = async (noteId: string): Promise<void> => {
  const response = await fetch(`${API_ROOT_URL}notes/${noteId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Error deleting note")
  }
}
