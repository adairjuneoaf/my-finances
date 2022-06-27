export const formatDate = (dateValue: number) => {
  const dateFormatted = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateValue);

  return dateFormatted;
};
