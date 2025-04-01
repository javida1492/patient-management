import { useState, useMemo } from "react"

/**
 * Custom hook to sort and filter an array of objects.
 *
 * @param {Array} data - The array of data objects.
 * @param {Function} [customFilterFn] - Optional custom filter function.
 *        It receives the item and the filter value as arguments.
 *
 * @returns {Object} - Returns the filtered data along with:
 *   - sortBy: current sort field,
 *   - sortOrder: "asc" or "desc" (current sort order),
 *   - filterValue: current filter text,
 *   - setSortBy: function to update the sort field,
 *   - setSortOrder: function to update the sort order,
 *   - setFilterValue: function to update the filter text.
 */
export const useSortAndFilter = (data, customFilterFn) => {
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc") // "asc" or "desc"
  const [filterValue, setFilterValue] = useState("")

  // Default filter function: checks if any field (as string) includes filterValue.
  const defaultFilterFn = (item, filterValue) => {
    const itemString = Object.values(item).join(" ").toLowerCase()
    return itemString.includes(filterValue.toLowerCase())
  }

  // Filter function: use custom filter function if provided; otherwise, use default.
  const filterFunction = (item) => {
    if (!filterValue) return true
    return customFilterFn
      ? customFilterFn(item, filterValue)
      : defaultFilterFn(item, filterValue)
  }

  const filteredData = useMemo(() => {
    let result = data.filter(filterFunction)

    if (sortBy) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]

        // For date fields (for example, dateOfBirth), compare as dates.
        if (sortBy === "dateOfBirth") {
          aVal = new Date(aVal)
          bVal = new Date(bVal)
        }

        // For strings, compare case-insensitively.
        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal > bVal) return 1 * (sortOrder === "asc" ? 1 : -1)
        if (aVal < bVal) return -1 * (sortOrder === "asc" ? 1 : -1)
        return 0
      })
    }

    return result
  }, [data, sortBy, sortOrder, filterValue, customFilterFn])

  return {
    filteredData,
    sortBy,
    sortOrder,
    filterValue,
    setSortBy,
    setSortOrder,
    setFilterValue,
  }
}
