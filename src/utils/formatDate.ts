export const formatDate = (dateValue: Date) => {
  const dateFormated = new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(
    dateValue
  );

  return dateFormated;
};
