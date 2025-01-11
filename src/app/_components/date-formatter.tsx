import { parseISO, format } from "date-fns";

type Props = {
  dateString: string | Date; // Allow dateString to be a Date object as well
};

const DateFormatter = ({ dateString }: Props) => {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString; // Check if dateString is a string
  return <time dateTime={dateString instanceof Date ? dateString.toISOString() : dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default DateFormatter;
