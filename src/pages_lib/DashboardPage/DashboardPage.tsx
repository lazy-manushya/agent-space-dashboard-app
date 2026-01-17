"use client";

import { useState } from "react";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";

import { joinClassNames } from "@/utils";
import Card from "@/components/Card";
import DateRangePicker from "@/components/DateRangePicker";
import Calendar from "@/components/Calendar";
import RangeCalendar from "@/components/RangeCalendar";

import { IDashboardPageProps } from "./DashboardPage.types";
import styles from "./DashboardPage.module.css";

function DashboardPage({ className }: IDashboardPageProps) {
  const now = today(getLocalTimeZone());

  // DateRangePicker state
  const [dateRange, setDateRange] = useState({
    start: now,
    end: now.add({ days: 7 }),
  });

  // Calendar state
  const [singleDate, setSingleDate] = useState(now);

  // RangeCalendar state
  const [calendarRange, setCalendarRange] = useState({
    start: now,
    end: now.add({ days: 5 }),
  });

  return (
    <div className={joinClassNames(className, styles.Container)}>
      <div className="container">
        <h1 style={{ marginBottom: "2rem", fontSize: "1.5rem", fontWeight: 600 }}>
          Date Components Test Page
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* DateRangePicker Test */}
          <Card title="DateRangePicker Component">
            <DateRangePicker
              label="Select Date Range"
              value={dateRange}
              onChange={setDateRange}
              minValue={now}
            />
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
              Selected: {dateRange.start.toString()} to {dateRange.end.toString()}
            </p>
          </Card>

          {/* Calendar Test */}
          <Card title="Calendar Component (Single Date)">
            <Calendar
              value={singleDate}
              onChange={setSingleDate}
              aria-label="Select a date"
            />
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
              Selected: {singleDate.toString()}
            </p>
          </Card>

          {/* RangeCalendar Test */}
          <Card title="RangeCalendar Component (Standalone)">
            <RangeCalendar
              value={calendarRange}
              onChange={setCalendarRange}
              aria-label="Select date range"
            />
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
              Selected: {calendarRange.start.toString()} to{" "}
              {calendarRange.end.toString()}
            </p>
          </Card>

          {/* With Min/Max Dates */}
          <Card title="DateRangePicker with Min/Max Dates">
            <DateRangePicker
              label="Restricted Dates (Next 30 days only)"
              minValue={now}
              maxValue={now.add({ days: 30 })}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
