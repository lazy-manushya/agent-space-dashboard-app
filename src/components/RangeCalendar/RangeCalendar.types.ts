import { RangeCalendarProps, DateValue } from "react-aria-components";

export interface IRangeCalendarProps<T extends DateValue = DateValue>
  extends RangeCalendarProps<T> {
  className?: string;
}
