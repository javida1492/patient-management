export interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
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

export interface PatientListProps {
  patients: Patient[]
  onAddPatient: () => void
  onSelectPatient: (patient: Patient) => void
}

export interface PatientListHeaderProps {
  onAddPatient: () => void
}

export interface PatientRowProps {
  patients: Patient[]
  onSelectPatient: (patient: Patient) => void
}

export interface Appointment extends NewAppointment {
  id: string
  dateTime: string // computed, e.g., "2023-10-15T09:00"
  patientName: string // looked up from patients list
}

export interface NewAppointment {
  patientId: string
  date: string
  startTime: string
  endTime: string
  providerId: string
  type: string
  status: string
}

export interface AppointmentListProps {
  appointments: Appointment[]
  selectedPatient?: Patient | null
  onAddAppointment: () => void
  onAddNote: (appointment: Appointment) => void
  getPatientAppointments: (patientId: string) => Appointment[]
  patients: Patient[]
}

export interface AppointmentTypeFieldProps {
  newAppointment: Appointment
  onAppointmentInputChange: React.ChangeEventHandler<{
    name?: string
    value: unknown
  }>
  error?: boolean
}

export interface AppointmentRowProps {
  displayedAppointments: Appointment[]
  patientMap: Record<string, string>
  providerMap: Record<string, string>
  onAddNote: (appointment: Appointment) => void
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

export interface NewNote {
  appointmentId: string
  chiefComplaint: string
  treatmentPlan: string
  progress: string
}

export interface Note {
  id: string
  appointmentId: string
  chiefComplaint: string
  treatmentPlan: string
  progress: string
}

export interface AddEditNoteDialogProps {
  open: boolean
  onClose: () => void
  onAddNote: () => void
  newNote: NewNote
  onNoteInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >
  selectedAppointment?: Appointment
  getAppointmentNote: (appointmentId: string) => Note | undefined
  patients: Patient[]
}

export interface ClinicalDocumentationProps {
  clinicalNotes: Note[]
  appointments: Appointment[]
  onAddNote: (appointment: Appointment) => void
  patients: Patient[]
}

export interface PatientForm {
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
}

export interface AddPatientDialogProps {
  open: boolean
  onClose: () => void
  onAddPatient: () => void
  newPatient: PatientForm
  onPatientInputChange: React.ChangeEventHandler<HTMLInputElement>
}
