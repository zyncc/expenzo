export function getDayMonth(dateString: Date) {
  const date = new Date(dateString);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${date.getDate().toString()} ${month}`;
}
