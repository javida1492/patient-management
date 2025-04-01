export const formatTime = (timeString) => {
  if (!timeString) return ""
  const [hours, minutes] = timeString.split(":")
  const date = new Date()
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10))
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
