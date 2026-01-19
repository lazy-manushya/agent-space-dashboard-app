# DateRangePicker, Calendar, and RangeCalendar Usage Guide

## Components Created

### 1. Calendar Component (Reusable)
**Location**: `src/components/Calendar/`
**Purpose**: Standalone calendar for selecting a single date
**Can be reused**: ✅ Yes, anywhere in the application

### 2. RangeCalendar Component (Reusable)
**Location**: `src/components/RangeCalendar/`
**Purpose**: Calendar for selecting date ranges with visual range indication
**Can be reused**: ✅ Yes, in DateRangePicker or standalone

### 3. DateRangePicker Component
**Location**: `src/components/DateRangePicker/`
**Purpose**: Complete date range picker with text inputs and calendar popover
**Uses**: RangeCalendar internally

---

## Installation

All components are already created following the BOE Dashboard coding standards. No additional dependencies needed - React Aria Components is already installed.

---

## Basic Usage Examples

### DateRangePicker (Complete Solution)

```tsx
"use client";

import { useState } from "react";
import { parseDate } from "@internationalized/date";
import DateRangePicker from "@/components/DateRangePicker";

function MyPage() {
  const [dateRange, setDateRange] = useState({
    start: parseDate("2025-01-01"),
    end: parseDate("2025-01-07"),
  });

  return (
    <DateRangePicker
      label="Select Date Range"
      value={dateRange}
      onChange={setDateRange}
    />
  );
}
```

### Calendar (Single Date Selection)

```tsx
"use client";

import { useState } from "react";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import Calendar from "@/components/Calendar";

function MyPage() {
  const [date, setDate] = useState(today(getLocalTimeZone()));

  return (
    <Calendar
      value={date}
      onChange={setDate}
      aria-label="Select appointment date"
    />
  );
}
```

### RangeCalendar (Standalone Range Selection)

```tsx
"use client";

import { useState } from "react";
import { parseDate } from "@internationalized/date";
import RangeCalendar from "@/components/RangeCalendar";

function MyPage() {
  const [range, setRange] = useState({
    start: parseDate("2025-01-01"),
    end: parseDate("2025-01-07"),
  });

  return (
    <RangeCalendar
      value={range}
      onChange={setRange}
      aria-label="Select date range"
    />
  );
}
```

---

## Advanced Usage

### With Min/Max Dates

```tsx
import { today, getLocalTimeZone } from "@internationalized/date";

function RestrictedDatePicker() {
  const now = today(getLocalTimeZone());

  return (
    <DateRangePicker
      label="Booking Dates"
      minValue={now}
      maxValue={now.add({ months: 3 })}
    />
  );
}
```

### With Disabled Dates (e.g., Weekends)

```tsx
import { isWeekend } from "@internationalized/date";
import { useLocale } from "react-aria-components";

function NoWeekendsPicker() {
  const { locale } = useLocale();

  return (
    <DateRangePicker
      label="Weekdays Only"
      isDateUnavailable={(date) => isWeekend(date, locale)}
    />
  );
}
```

### With Validation

```tsx
function ValidatedPicker() {
  const [range, setRange] = useState({ start: null, end: null });
  const maxDays = 7;

  const isInvalid =
    range.start &&
    range.end &&
    range.end.compare(range.start) > maxDays;

  return (
    <DateRangePicker
      label="Select up to 7 days"
      value={range}
      onChange={setRange}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? "Maximum 7 days allowed" : undefined}
    />
  );
}
```

### Controlled with Form

```tsx
function BookingForm() {
  const [formData, setFormData] = useState({
    checkIn: parseDate("2025-01-10"),
    checkOut: parseDate("2025-01-15"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Check-in:", formData.checkIn.toString());
    console.log("Check-out:", formData.checkOut.toString());
  };

  return (
    <form onSubmit={handleSubmit}>
      <DateRangePicker
        label="Stay Duration"
        value={{ start: formData.checkIn, end: formData.checkOut }}
        onChange={({ start, end }) =>
          setFormData({ checkIn: start, checkOut: end })
        }
        startName="checkIn"
        endName="checkOut"
        isRequired
      />
      <Button type="submit">Book Now</Button>
    </form>
  );
}
```

---

## Props Reference

### DateRangePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | - | Field label text |
| `value` | `{start: DateValue, end: DateValue}` | - | Controlled value |
| `defaultValue` | `{start: DateValue, end: DateValue}` | - | Uncontrolled default |
| `onChange` | `(range) => void` | - | Change handler |
| `minValue` | `DateValue` | - | Earliest selectable date |
| `maxValue` | `DateValue` | - | Latest selectable date |
| `isDateUnavailable` | `(date) => boolean` | - | Mark specific dates unavailable |
| `isRequired` | `boolean` | false | Field is required |
| `isDisabled` | `boolean` | false | Disable entire component |
| `isReadOnly` | `boolean` | false | Read-only mode |
| `isInvalid` | `boolean` | false | Mark as invalid |
| `errorMessage` | `string \| function` | - | Error message display |
| `startName` | `string` | - | Form name for start date |
| `endName` | `string` | - | Form name for end date |
| `className` | `string` | - | Additional CSS classes |

### Calendar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateValue` | - | Controlled date value |
| `defaultValue` | `DateValue` | - | Uncontrolled default |
| `onChange` | `(date) => void` | - | Change handler |
| `minValue` | `DateValue` | - | Earliest selectable date |
| `maxValue` | `DateValue` | - | Latest selectable date |
| `isDateUnavailable` | `(date) => boolean` | - | Mark dates unavailable |
| `isDisabled` | `boolean` | false | Disable calendar |
| `isReadOnly` | `boolean` | false | Read-only mode |
| `className` | `string` | - | Additional CSS classes |

### RangeCalendar Props

Same as Calendar but with range value type:
- `value`: `{start: DateValue, end: DateValue}`
- `onChange`: `(range) => void`

---

## Date Utilities

You must install `@internationalized/date` package:

```bash
npm install @internationalized/date
```

Common utilities:

```tsx
import {
  parseDate,           // Parse ISO date string
  today,               // Get today's date
  getLocalTimeZone,    // Get user's timezone
  isWeekend,           // Check if date is weekend
  CalendarDate,        // Date object
} from "@internationalized/date";

// Examples
const date1 = parseDate("2025-01-17");
const date2 = today(getLocalTimeZone());
const date3 = new CalendarDate(2025, 1, 17);

// Date arithmetic
const tomorrow = today(getLocalTimeZone()).add({ days: 1 });
const nextWeek = today(getLocalTimeZone()).add({ weeks: 1 });
const nextMonth = today(getLocalTimeZone()).add({ months: 1 });

// Comparisons
date1.compare(date2); // -1 (before), 0 (same), 1 (after)
```

---

## Styling Customization

All components use CSS Modules with data attributes for state-based styling.

### Available Data Attributes

**Calendar/RangeCalendar Cells**:
- `[data-selected]` - Selected date
- `[data-selection-start]` - Range start
- `[data-selection-end]` - Range end
- `[data-hovered]` - Hover state
- `[data-pressed]` - Pressed state
- `[data-focused]` - Keyboard focus
- `[data-disabled]` - Disabled date
- `[data-unavailable]` - Unavailable date
- `[data-outside-month]` - Outside current month
- `[data-invalid]` - Invalid selection

**DateRangePicker**:
- `[data-focus-within]` - Input has focus
- `[data-disabled]` - Disabled state
- `[data-placeholder]` - Segment is placeholder

### Custom Styling Example

```css
/* Override in your component's CSS Module */
.MyCustomPicker :global(.CalendarCell)[data-selected] {
  background: #ff6b6b;
  color: white;
}
```

---

## Accessibility

All components built with React Aria provide:

✅ **Keyboard Navigation**
- Arrow keys to navigate dates
- Enter/Space to select
- Tab to move between inputs

✅ **Screen Reader Support**
- ARIA labels on all elements
- Announcements for date selection
- Clear context for form fields

✅ **Focus Management**
- Visible focus indicators
- Logical tab order
- Focus trap in popover

---

## File Structure (Following BOE Standards)

```
src/components/
├── Calendar/
│   ├── Calendar.tsx
│   ├── Calendar.types.ts
│   ├── Calendar.module.css
│   └── index.ts
├── RangeCalendar/
│   ├── RangeCalendar.tsx
│   ├── RangeCalendar.types.ts
│   ├── RangeCalendar.module.css
│   └── index.ts
└── DateRangePicker/
    ├── DateRangePicker.tsx
    ├── DateRangePicker.types.ts
    ├── DateRangePicker.module.css
    └── index.ts
```

Each component follows:
- ✅ PascalCase naming
- ✅ `I` prefix for interfaces
- ✅ CSS Modules with PascalCase classes
- ✅ Barrel exports in index.ts
- ✅ React Aria component wrapping
- ✅ "use client" directive

---

## Testing the Components

Add to your page (e.g., `src/pages_lib/DashboardPage/DashboardPage.tsx`):

```tsx
"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import DateRangePicker from "@/components/DateRangePicker";
import Calendar from "@/components/Calendar";
import Card from "@/components/Card";

function DashboardPage() {
  const now = today(getLocalTimeZone());
  const [range, setRange] = useState({
    start: now,
    end: now.add({ days: 7 }),
  });

  return (
    <div className="container">
      <Card title="Date Range Picker Demo">
        <DateRangePicker
          label="Select your dates"
          value={range}
          onChange={setRange}
          minValue={now}
        />

        <p style={{ marginTop: "1rem" }}>
          Selected: {range.start.toString()} to {range.end.toString()}
        </p>
      </Card>
    </div>
  );
}

export default DashboardPage;
```

---

## Notes

- All components follow the BOE Dashboard coding standards exactly
- Calendar and RangeCalendar are fully reusable across the application
- DateRangePicker uses RangeCalendar internally
- All components use React Aria for accessibility
- CSS follows PascalCase convention with CSS variables
- TypeScript interfaces all have `I` prefix
