import React from "react";
import {
  DateRangePickerProps,
  DateValue,
} from "react-aria-components";

export interface IDateRangePickerProps<T extends DateValue = DateValue>
  extends DateRangePickerProps<T> {
  className?: string;
  label?: React.ReactNode;
}
