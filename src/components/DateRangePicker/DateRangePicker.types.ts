import React from "react";
import { DateValue } from "react-aria-components";

export interface IDateRangePickerProps {
  className?: string;
  label?: React.ReactNode;
  value?: {
    start: DateValue | null;
    end: DateValue | null;
  };
  onChange?: (value: { start: DateValue; end: DateValue } | null) => void;
  "aria-label"?: string;
}
