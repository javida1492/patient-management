import React, { useEffect, useState } from "react"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material"
import { fetchProviders } from "../../services/api"
import { ProviderFieldProps, Provider } from "./interfaces"

export const ProviderField: React.FC<ProviderFieldProps> = ({
  newAppointment,
  onAppointmentInputChange,
  error = false,
}) => {
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    const getProviders = async () => {
      try {
        const data = await fetchProviders()
        setProviders(data)
      } catch (err) {
        console.error("Error fetching providers:", err)
      }
    }
    getProviders()
  }, [])

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>Provider</InputLabel>
      <Select
        name="providerId"
        value={newAppointment.providerId || ""}
        onChange={(event: SelectChangeEvent<string>, child) =>
          onAppointmentInputChange(
            event as unknown as React.ChangeEvent<{
              name?: string
              value: unknown
            }>
          )
        }
        label="Provider"
      >
        {providers.map((provider: Provider) => (
          <MenuItem key={provider.id.toString()} value={provider.id.toString()}>
            {provider.firstName + " " + provider.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
