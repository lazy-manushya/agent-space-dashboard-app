"use client";

import { useState, useEffect } from "react";
import {
  DatePicker,
  DateInput,
  DateSegment,
  Group,
  Label,
  Popover,
  type DateValue,
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
  const [localStart, setLocalStart] = useState<DateValue | null>(value?.start || null);
  const [localEnd, setLocalEnd] = useState<DateValue | null>(value?.end || null);

  // Update local state when external value changes
  useEffect(() => {
    setLocalStart(value?.start || null);
    setLocalEnd(value?.end || null);
  }, [value]);

  const isValidDate = (date: any): boolean => {
    if (!date) return false;
    try {
      // Check if the date has all required fields and they are valid
      const year = date.year;
      const month = date.month;
      const day = date.day;

      // Validate year (should be 4 digits)
      if (!year || year < 1000 || year > 9999) return false;

      // Validate month (1-12)
      if (!month || month < 1 || month > 12) return false;

      // Validate day (1-31, depending on month)
      if (!day || day < 1 || day > 31) return false;

      return true;
    } catch {
      return false;
    }
  };

  const handleStartChange = (newStart: any) => {
    setLocalStart(newStart);

    // Only call onChange if we have a valid complete date or if clearing (null)
    if (onChange && (newStart === null || isValidDate(newStart))) {
      onChange({
        start: newStart,
        end: localEnd,
      });
    }
  };

  const handleEndChange = (newEnd: any) => {
    setLocalEnd(newEnd);

    // Only call onChange if we have a valid complete date or if clearing (null)
    if (onChange && (newEnd === null || isValidDate(newEnd))) {
      onChange({
        start: localStart,
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
            value={localStart}
            onChange={handleStartChange}
            aria-label={ariaLabel ? `${ariaLabel} - Start` : "Start date"}
          >
            <Group className={styles.Group}>
              <DateInput className={styles.DateInput}>
                {(segment) => (
                  <DateSegment segment={segment} className={styles.DateSegment} />
                )}
              </DateInput>
              <Button variant="ghost" size="sm" className={styles.Button} aria-label="Open start date calendar">
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
            value={localEnd}
            onChange={handleEndChange}
            aria-label={ariaLabel ? `${ariaLabel} - End` : "End date"}
          >
            <Group className={styles.Group}>
              <DateInput className={styles.DateInput}>
                {(segment) => (
                  <DateSegment segment={segment} className={styles.DateSegment} />
                )}
              </DateInput>
              <Button variant="ghost" size="sm" className={styles.Button} aria-label="Open end date calendar">
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
