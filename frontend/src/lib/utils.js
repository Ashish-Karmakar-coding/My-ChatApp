export function formatMessageTime(date) {
  // Handle invalid or missing dates
  if (!date) return "Now";
  
  const messageDate = new Date(date);
  
  // Check if the date is invalid
  if (isNaN(messageDate.getTime())) {
    return "Now";
  }
  
  return messageDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}