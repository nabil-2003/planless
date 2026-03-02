export function timeToHoursRounded(time: string, decimals = 2): number {
  const total = timeToHours(time);
  return Number(total.toFixed(decimals));
}

function timeToHours(time: string): number {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours + minutes / 60 + seconds / 3600;
}
