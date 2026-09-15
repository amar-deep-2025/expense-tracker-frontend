const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return "N/A";
  }

  return new Date(dateTime).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export default formatDateTime;
