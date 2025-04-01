import React, { useState, useEffect, useMemo } from "react"
import { TableBody, TableCell, TableRow, IconButton, Chip } from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import { formatDate, formatTime } from "../../utils"
import { AppointmentRowProps, Provider } from "../../interfaces"
import { fetchProviders } from "../../services/api"

const getColor = (status: string): "error" | "success" | "primary" => {
  if (status === "Canceled") return "error"
  if (status === "Checked In") return "success"
  return "primary"
}

export const AppointmentRow: React.FC<
  Omit<AppointmentRowProps, "providerMap">
> = ({ displayedAppointments, patientMap, onAddNote }) => {
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const data = await fetchProviders()
        setProviders(data)
      } catch (error) {
        console.error("Error fetching providers:", error)
      }
    }
    loadProviders()
  }, [])

  const providerMap = useMemo<Record<string, string>>(() => {
    return providers.reduce((acc, provider) => {
      acc[provider.id.toString()] = `${provider.firstName} ${provider.lastName}`
      return acc
    }, {} as Record<string, string>)
  }, [providers])

  return (
    <TableBody>
      {displayedAppointments.map((appointment) => {
        const patientName =
          patientMap[appointment.patientId] || appointment.patientId
        const providerName =
          providerMap[appointment.providerId] || appointment.providerId

        return (
          <TableRow key={appointment.id}>
            <TableCell>{patientName}</TableCell>
            <TableCell>{formatDate(appointment.date)}</TableCell>
            <TableCell>{formatTime(appointment.startTime)}</TableCell>
            <TableCell>{formatTime(appointment.endTime)}</TableCell>
            <TableCell>{providerName}</TableCell>
            <TableCell>{appointment.type}</TableCell>
            <TableCell>
              <Chip
                label={appointment.status}
                color={getColor(appointment.status)}
                size="small"
              />
            </TableCell>
            <TableCell>
              <IconButton
                color="primary"
                onClick={() => onAddNote(appointment)}
              >
                <DescriptionIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default AppointmentRow
