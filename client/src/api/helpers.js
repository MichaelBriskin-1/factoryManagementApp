export function formatShift(s) {
  const date = new Date(s.date);
  return `${date.toLocaleDateString()} ${s.startingHour}:00–${s.endingHour}:00`;
}
