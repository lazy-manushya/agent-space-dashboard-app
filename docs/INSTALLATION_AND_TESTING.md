# Installation and Testing Guide

## 🚀 Quick Start

### Step 1: Install Required Dependencies

The components require the `@internationalized/date` package for date handling.

```bash
npm install @internationalized/date
```

**Why this package?**
- React Aria's date components use `@internationalized/date` for date objects
- Provides timezone-aware date handling
- Supports multiple calendar systems
- Type-safe date operations

### Step 2: Verify Installation

After installation, your `package.json` should include:

```json
{
  "dependencies": {
    "@internationalized/date": "^3.x.x",
    "react-aria-components": "^1.14.0",
    // ... other dependencies
  }
}
```

---

## 🧪 Testing the Components

### Test Page Already Created

I've updated the Dashboard page with a comprehensive test of all components:

**File**: `src/pages_lib/DashboardPage/DashboardPage.tsx`

The test page includes:
1. ✅ DateRangePicker with label and state
2. ✅ Calendar (single date selection)
3. ✅ RangeCalendar (standalone range selection)
4. ✅ DateRangePicker with min/max date restrictions

### Running the App

```bash
# Start the development server
npm run start:dev

# The app will be available at:
# http://localhost:3000
```

### What You'll See

When you navigate to the home page, you'll see:

1. **DateRangePicker Component**
   - Two input fields (start date / end date)
   - Calendar icon button
   - Click button to open calendar popover
   - Selected dates displayed below

2. **Calendar Component**
   - Single month view
   - Previous/Next navigation buttons
   - Click any date to select
   - Selected date displayed below

3. **RangeCalendar Component**
   - Single month view with range selection
   - Click first date (start), then second date (end)
   - Visual range indication
   - Selected range displayed below

4. **DateRangePicker with Restrictions**
   - Only next 30 days are selectable
   - Past dates disabled
   - Future dates beyond 30 days disabled

---

## ✅ Verification Checklist

### Visual Checks

- [ ] DateRangePicker displays two input fields
- [ ] Calendar icon appears on the right
- [ ] Clicking icon opens popover with calendar
- [ ] Calendar shows current month and year
- [ ] Previous/Next buttons work
- [ ] Can click dates to select them
- [ ] Selected dates are highlighted
- [ ] In RangeCalendar, range is visually indicated
- [ ] Popover closes when clicking outside
- [ ] Selected dates update the text below

### Interaction Checks

- [ ] Keyboard navigation works (Tab, Arrow keys)
- [ ] Can type dates directly in input fields
- [ ] Input segments respond to arrow up/down
- [ ] Enter key confirms selection
- [ ] Escape key closes popover
- [ ] Hover states work on calendar cells
- [ ] Disabled dates are not selectable

### Style Checks

- [ ] Colors match existing components
- [ ] Border radius is consistent (0.75rem, 1rem)
- [ ] Font sizes are consistent
- [ ] Transitions are smooth (240ms)
- [ ] CSS variables work (`rgb(var(--clr-primary-rgb))`)
- [ ] PascalCase classes are applied
- [ ] Responsive on mobile (if applicable)

---

## 🐛 Common Issues and Solutions

### Issue 1: Module Not Found Error

**Error**: `Cannot find module '@internationalized/date'`

**Solution**:
```bash
npm install @internationalized/date
```

### Issue 2: React Aria Components Not Found

**Error**: `Cannot find module 'react-aria-components'`

**Solution**:
```bash
npm install react-aria-components
```

### Issue 3: TypeScript Errors

**Error**: Type errors in component files

**Solution**:
- Make sure TypeScript is version 5+
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

### Issue 4: Styles Not Applied

**Error**: Components appear unstyled

**Solution**:
- Check CSS Module imports are correct
- Verify `.module.css` extension
- Clear Next.js cache and restart

### Issue 5: Calendar Popover Doesn't Open

**Error**: Clicking button doesn't show calendar

**Solution**:
- Check Button component accepts `slot="trigger"` (implicit)
- Verify Popover is direct child of DateRangePicker
- Check z-index in CSS (should be 1000)

---

## 📋 Build Test

To verify components build correctly:

```bash
# Run build command
npm run build

# Should complete without errors
# Check for any TypeScript or import errors
```

**Expected Output**:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

---

## 🔍 Manual Testing Steps

### Test 1: Basic DateRangePicker

1. Open home page
2. Find "DateRangePicker Component" card
3. Click calendar icon button
4. Calendar popover should appear
5. Click a start date
6. Click an end date (after start)
7. Popover should close
8. Selected dates should display below
9. Input fields should show selected dates

**Expected**: ✅ Works smoothly, dates update correctly

### Test 2: Calendar Component

1. Find "Calendar Component (Single Date)" card
2. Click on any date in the calendar
3. Date should be highlighted
4. Selected date should display below
5. Click previous/next month buttons
6. Month should change

**Expected**: ✅ Single date selection works

### Test 3: RangeCalendar Component

1. Find "RangeCalendar Component (Standalone)" card
2. Click a start date
3. Click an end date
4. All dates between should be highlighted
5. Start date has left-rounded background
6. End date has right-rounded background
7. Middle dates have rectangular background
8. Selected range displays below

**Expected**: ✅ Range selection with visual indication works

### Test 4: Date Restrictions

1. Find "DateRangePicker with Min/Max Dates" card
2. Click calendar icon
3. Try to select a past date (should be disabled/grayed out)
4. Try to select a date beyond 30 days (should be disabled)
5. Can only select dates within next 30 days

**Expected**: ✅ Date restrictions work correctly

### Test 5: Keyboard Navigation

1. Focus on DateRangePicker input field
2. Press Tab to move between segments (month/day/year)
3. Press Arrow Up/Down to change values
4. Press Tab to move to next input field
5. Press Space or Enter on calendar button to open
6. Use Arrow keys to navigate calendar
7. Press Enter to select date
8. Press Escape to close popover

**Expected**: ✅ Full keyboard navigation works

---

## 📊 Performance Test

Check performance in browser DevTools:

1. Open DevTools (F12)
2. Go to Performance tab
3. Record interaction with DateRangePicker
4. Check for:
   - [ ] No layout thrashing
   - [ ] Smooth animations (60fps)
   - [ ] Fast render times (<16ms)
   - [ ] No memory leaks

---

## 🎨 Responsive Test

Test on different screen sizes:

1. Desktop (1920x1080) - ✅ Should work
2. Laptop (1366x768) - ✅ Should work
3. Tablet (768px) - ✅ Should work
4. Mobile (380px) - ✅ Should work

**Note**: Components are not specifically mobile-optimized yet, but should be functional.

---

## 📱 Browser Compatibility

Test in multiple browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Expected**: ✅ All components work in modern browsers

---

## ✨ Accessibility Test

### Screen Reader Test

1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate to DateRangePicker
3. Tab through components
4. Listen to announcements

**Expected Announcements**:
- "Select Date Range, date range picker"
- "Start date, January 17, 2025"
- "End date, January 24, 2025"
- "Open calendar, button"
- "Calendar grid, January 2025"
- Selected date announcements

### Keyboard-Only Test

1. Disable mouse/trackpad
2. Use only keyboard to:
   - Navigate to component (Tab)
   - Open calendar (Space/Enter)
   - Select dates (Arrow keys + Enter)
   - Close popover (Escape)

**Expected**: ✅ All functionality accessible via keyboard

---

## 🎯 Success Criteria

All components are working correctly if:

✅ No console errors in browser
✅ All components render visually
✅ Date selection works
✅ Popover opens and closes
✅ Keyboard navigation works
✅ Selected dates update correctly
✅ Styles match existing components
✅ Responsive on different screen sizes
✅ No TypeScript errors
✅ Build completes successfully

---

## 📞 If Something Doesn't Work

### Check These First:

1. **Install dependencies**:
   ```bash
   npm install @internationalized/date
   ```

2. **Clear cache and restart**:
   ```bash
   rm -rf .next
   rm -rf node_modules
   npm install
   npm run start:dev
   ```

3. **Check component imports** in DashboardPage.tsx:
   ```tsx
   import DateRangePicker from "@/components/DateRangePicker";
   import Calendar from "@/components/Calendar";
   import RangeCalendar from "@/components/RangeCalendar";
   ```

4. **Verify file structure**:
   ```bash
   ls src/components/Calendar/
   ls src/components/RangeCalendar/
   ls src/components/DateRangePicker/
   ```

Each should have: `.tsx`, `.types.ts`, `.module.css`, `index.ts`

---

## 🚀 Next Steps After Testing

Once testing is complete:

1. ✅ Remove test examples from DashboardPage if not needed
2. ✅ Use components in actual pages/features
3. ✅ Customize styles if needed (via className prop)
4. ✅ Add validation logic as needed
5. ✅ Integrate with forms and data submission

---

## 📝 Quick Test Script

Run this in your terminal after starting the dev server:

```bash
# 1. Install dependency
npm install @internationalized/date

# 2. Start dev server
npm run start:dev

# 3. Open browser
# Visit: http://localhost:3000

# 4. Test interactions:
# - Click calendar icons
# - Select dates
# - Use keyboard navigation
# - Check console for errors

# 5. Run build test
npm run build
```

**If all steps complete without errors**: ✅ **Components are working!**
