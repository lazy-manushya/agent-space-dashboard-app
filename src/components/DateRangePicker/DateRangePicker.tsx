"use client";

import {
  DateRangePicker as ReactAriaDateRangePicker,
  DateInput,
  DateSegment,
  Group,
  Label,
  Popover,
} from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import Button from "@/components/Button";
import Image from "@/components/Image";
import RangeCalendar from "@/components/RangeCalendar";

import { IDateRangePickerProps } from "./DateRangePicker.types";
import styles from "./DateRangePicker.module.css";

function DateRangePicker({
  className,
  label,
  ...props
}: IDateRangePickerProps) {
  return (
    <ReactAriaDateRangePicker
      className={joinClassNames(styles.Container, className)}
      {...props}
    >
      {label && <Label className={styles.Label}>{label}</Label>}
      <Group className={styles.Group}>
        <DateInput slot="start" className={styles.DateInput}>
          {(segment) => (
            <DateSegment segment={segment} className={styles.DateSegment} />
          )}
        </DateInput>
        <span className={styles.Separator}>–</span>
        <DateInput slot="end" className={styles.DateInput}>
          {(segment) => (
            <DateSegment segment={segment} className={styles.DateSegment} />
          )}
        </DateInput>
        <Button variant="ghost" size="sm" className={styles.Button}>
          <Image
            src="/assets/images/icons/chevron_left.svg"
            alt="Open calendar"
            height={20}
            width={20}
            style={{ transform: "rotate(-90deg)" }}
          />
        </Button>
      </Group>
      <Popover className={styles.Popover} offset={8}>
        <RangeCalendar />
      </Popover>
    </ReactAriaDateRangePicker>
  );
}

export default DateRangePicker;
