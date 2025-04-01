import React from "react"
import AddIcon from "@mui/icons-material/Add"
import { Box, Button, Typography } from "@mui/material"

import { PatientListHeaderProps } from "../../interfaces"

export const PatientListHeader: React.FC<PatientListHeaderProps> = ({
  onAddPatient,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h6">Patient List</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onAddPatient}
      >
        Add Patient
      </Button>
    </Box>
  )
}
