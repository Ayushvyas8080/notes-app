export function formatDate(date) {
  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleDateString('en-GB');
  return formattedDate;
}
