export const formatTime = (timeString) => {
  if (!timeString) return ""
  // Split time string assuming "HH:mm" format
  const [hours, minutes] = timeString.split(":")
  // Create a date and set hours/minutes
  const date = new Date()
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10))
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
