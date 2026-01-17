import { CalendarProps, DateValue } from "react-aria-components";

export interface ICalendarProps<T extends DateValue = DateValue>
  extends CalendarProps<T> {
  className?: string;
}
