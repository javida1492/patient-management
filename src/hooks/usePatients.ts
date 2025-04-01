import { useState, useEffect } from "react"
import { fetchPatients, addPatient } from "../services/api"
import { Patient } from "../interfaces"

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients()
        setPatients(data)
      } catch (error) {
        console.error("Error fetching patients:", error)
      }
    }
    getPatients()
  }, [])

  const addNewPatient = async (
    newPatient: Omit<Patient, "id">
  ): Promise<void> => {
    try {
      const patient = await addPatient(newPatient)
      setPatients((prev) => [...prev, patient])
    } catch (error) {
      console.error("Error adding patient:", error)
    }
  }

  return { patients, addNewPatient, setPatients }
}
