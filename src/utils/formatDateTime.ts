export const formatDateTime = (dateTimeString: string) => {
  if (!dateTimeString) return ""
  const date = new Date(dateTimeString)
  return date.toLocaleString()
}
