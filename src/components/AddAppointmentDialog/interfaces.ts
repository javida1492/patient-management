export interface Appointment {
  patientId: string
  date: string
  startTime: string
  endTime: string
  providerId: string
  type: string
  status: string
}

export interface Patient {
  id: string
  firstName: string
  lastName: string
}

type InputChangeHandler = React.ChangeEventHandler<{
  name?: string
  value: unknown
}>

export interface AddAppointmentDialogProps {
  open: boolean
  onClose: () => void
  onAddAppointment: () => void
  newAppointment: Appointment
  onAppointmentInputChange: InputChangeHandler
  patients: Patient[]
}

export interface PatientFieldProps {
  newAppointment: Appointment
  onAppointmentInputChange: React.ChangeEventHandler<{
    name?: string
    value: unknown
  }>
  patients: Patient[]
  error?: boolean
  helperText?: string
}

export interface Provider {
  id: string
  firstName: string
  lastName: string
}

export interface ProviderFieldProps {
  newAppointment: Appointment
  onAppointmentInputChange: React.ChangeEventHandler<{
    name?: string
    value: unknown
  }>
  error?: boolean
}

export interface StatusFieldProps {
  newAppointment: Appointment
  onAppointmentInputChange: React.ChangeEventHandler<{
    name?: string
    value: unknown
  }>
  error?: boolean
}

export interface AppointmentTypeFieldProps {
  newAppointment: Appointment
  onAppointmentInputChange: React.ChangeEventHandler<{
    name?: string
    value: unknown
  }>
  error?: boolean
}
