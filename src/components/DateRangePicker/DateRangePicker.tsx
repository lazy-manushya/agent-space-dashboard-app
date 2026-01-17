"use client";

import {
  DatePicker,
  DateInput,
  DateSegment,
  Group,
  Label,
  Popover,
} from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Calendar from "@/components/Calendar";

import { IDateRangePickerProps } from "./DateRangePicker.types";
import styles from "./DateRangePicker.module.css";

function DateRangePicker({
  className,
  label,
  value,
  onChange,
  "aria-label": ariaLabel,
}: IDateRangePickerProps) {
  const handleStartChange = (newStart: any) => {
    if (newStart && onChange) {
      onChange({
        start: newStart,
        end: value?.end || newStart,
      });
    }
  };

  const handleEndChange = (newEnd: any) => {
    if (newEnd && onChange) {
      onChange({
        start: value?.start || newEnd,
        end: newEnd,
      });
    }
  };

  return (
    <div className={joinClassNames(styles.Container, className)}>
      {label && <Label className={styles.Label}>{label}</Label>}
      <div className={styles.DatesColumn}>
        <div className={styles.DateInputWrapper}>
          <span className={styles.DateLabel}>Start Date</span>
          <DatePicker
            value={value?.start}
            onChange={handleStartChange}
            aria-label={ariaLabel ? `${ariaLabel} - Start` : "Start date"}
          >
            <Group className={styles.Group}>
              <DateInput className={styles.DateInput}>
                {(segment) => (
                  <DateSegment segment={segment} className={styles.DateSegment} />
                )}
              </DateInput>
              <Button variant="ghost" size="sm" className={styles.Button}>
                <Image
                  src="/assets/images/icons/chevron_left.svg"
                  alt="Open calendar"
                  height={16}
                  width={16}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </Button>
            </Group>
            <Popover className={styles.Popover} offset={8}>
              <Calendar />
            </Popover>
          </DatePicker>
        </div>
        <div className={styles.DateInputWrapper}>
          <span className={styles.DateLabel}>End Date</span>
          <DatePicker
            value={value?.end}
            onChange={handleEndChange}
            aria-label={ariaLabel ? `${ariaLabel} - End` : "End date"}
          >
            <Group className={styles.Group}>
              <DateInput className={styles.DateInput}>
                {(segment) => (
                  <DateSegment segment={segment} className={styles.DateSegment} />
                )}
              </DateInput>
              <Button variant="ghost" size="sm" className={styles.Button}>
                <Image
                  src="/assets/images/icons/chevron_left.svg"
                  alt="Open calendar"
                  height={16}
                  width={16}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </Button>
            </Group>
            <Popover className={styles.Popover} offset={8}>
              <Calendar />
            </Popover>
          </DatePicker>
        </div>
      </div>
    </div>
  );
}

export default DateRangePicker;
