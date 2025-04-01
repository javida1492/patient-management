import { useState, useEffect } from "react"
import { Appointment, NewAppointment, Patient } from "../interfaces"
import { fetchAppointments } from "../services/api"

export const useAppointments = (patients: Patient[]) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Fetch appointments from the API when the hook mounts.
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data: Appointment[] = await fetchAppointments()
        setAppointments(data)
      } catch (error) {
        console.error("Error fetching appointments:", error)
      }
    }

    getAppointments()
  }, [])

  const addAppointment = (newAppointment: NewAppointment): void => {
    // Compute a combined dateTime from the provided date and startTime.
    const computedDateTime = `${newAppointment.date}T${newAppointment.startTime}`
    const patient = patients.find((p) => p.id === newAppointment.patientId)
    const newAppointmentWithId: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
      dateTime: computedDateTime,
      // Compute the patient's full name from firstName and lastName.
      patientName: patient ? `${patient.firstName} ${patient.lastName}` : "",
    }
    setAppointments((prev) => [...prev, newAppointmentWithId])
  }

  const getPatientAppointments = (patientId: string): Appointment[] =>
    appointments.filter((a) => a.patientId === patientId)

  return { appointments, addAppointment, getPatientAppointments }
}
