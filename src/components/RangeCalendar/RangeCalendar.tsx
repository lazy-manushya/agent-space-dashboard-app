"use client";

import {
  RangeCalendar as ReactAriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
} from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import Button from "@/components/Button";
import Image from "@/components/Image";

import { IRangeCalendarProps } from "./RangeCalendar.types";
import styles from "./RangeCalendar.module.css";

function RangeCalendar({ className, ...props }: IRangeCalendarProps) {
  return (
    <ReactAriaRangeCalendar
      className={joinClassNames(styles.Container, className)}
      {...props}
    >
      <header className={styles.Header}>
        <Button slot="previous" variant="ghost" size="sm">
          <Image
            src="/assets/images/icons/chevron_left.svg"
            alt="Previous"
            height={20}
            width={20}
          />
        </Button>
        <Heading className={styles.Heading} />
        <Button slot="next" variant="ghost" size="sm">
          <Image
            src="/assets/images/icons/chevron_left.svg"
            alt="Next"
            height={20}
            width={20}
            style={{ transform: "rotate(180deg)" }}
          />
        </Button>
      </header>
      <CalendarGrid className={styles.CalendarGrid}>
        <CalendarGridHeader className={styles.CalendarGridHeader}>
          {(day) => (
            <CalendarHeaderCell className={styles.CalendarHeaderCell}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody className={styles.CalendarGridBody}>
          {(date) => (
            <CalendarCell date={date} className={styles.CalendarCell} />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </ReactAriaRangeCalendar>
  );
}

export default RangeCalendar;
