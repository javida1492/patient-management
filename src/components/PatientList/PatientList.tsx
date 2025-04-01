import React from "react"
import { Table, TableContainer, Paper, TextField, Box } from "@mui/material"
import { useSortAndFilter } from "../../hooks"
import { formatDate } from "../../utils"
import { Columns } from "./Columns"
import { PatientRow } from "./PatientRow"
import { PatientListHeader } from "./PatientListHeader"

const CONTAINER_STYLE = {
  maxHeight: "calc(100vh - 150px)",
  overflowY: "auto",
}

import { Patient, PatientListProps } from "../../interfaces"

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onAddPatient,
  onSelectPatient,
}) => {
  // Custom filter function to filter patients based on a search string.
  const customFilter = (patient: Patient, filterVal: string): boolean => {
    const lowerFilter = filterVal.toLowerCase()
    return (
      patient.firstName.toLowerCase().includes(lowerFilter) ||
      patient.lastName.toLowerCase().includes(lowerFilter) ||
      formatDate(patient.dateOfBirth).toLowerCase().includes(lowerFilter)
    )
  }

  const {
    filteredData,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    filterValue,
    setFilterValue,
  } = useSortAndFilter(patients, customFilter)

  // Toggle sort order if the same field is clicked again, otherwise set ascending.
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <PatientListHeader onAddPatient={onAddPatient} />
      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Filter Patients"
          variant="outlined"
          size="small"
          value={filterValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterValue(e.target.value)
          }
        />
      </Box>
      <TableContainer sx={CONTAINER_STYLE}>
        <Table stickyHeader>
          <Columns sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
          <PatientRow
            patients={filteredData}
            onSelectPatient={onSelectPatient}
          />
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PatientList
