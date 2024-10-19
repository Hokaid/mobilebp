import { format } from "date-fns";

export function formatDateWithoutTimezone(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return format(date, 'dd/MM/yyyy');
}