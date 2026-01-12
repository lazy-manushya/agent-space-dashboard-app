### 1. Export Functionality
- [ ] Implement Excel export using library (xlsx or exceljs)
- [ ] Create export modal/dialog
- [ ] Add column selection for export
- [ ] Add date range filter for export
- [ ] Implement "Use current filters" option
- [ ] Add "Remember my column selection" checkbox
- [ ] Generate downloadable Excel file
- [ ] Style Excel output with headers and formatting


## 3. Left Sidebar Navigation
- [ ] Create fixed sidebar component (220px width, blue background #0EA5E9)
- [ ] Add "Freight Pilot" logo with compass icon at top
- [ ] Add "by Agent Space" subtitle below logo
- [ ] Implement navigation menu items:
  - Dashboard (Home icon)
  - BOE Search (Search icon)
  - Reports (Document icon)
  - Analytics (Chart icon)
  - Settings (Gear icon)
- [ ] Add active state styling for selected nav item
- [ ] Add hover effects on navigation items
- [ ] Add user profile section at bottom of sidebar
  - Avatar with initials
  - User name
  - Department/role label
- [ ] Make sidebar fixed and scrollable for longer menus

### 4. Screen 1: BOE Search Screen
- [ ] Create centered search layout
- [ ] Add large search icon (60px) with blue background
- [ ] Add "Search Bill of Entry" heading
- [ ] Add descriptive subtitle text
- [ ] Create search input field with:
  - Placeholder: "Enter BOE Number (e.g., 784512/2024)"
  - Search icon inside input (left side)
  - Focus state with blue border and shadow
- [ ] Add "Search" button (blue, primary style)
- [ ] Add example text below search box
- [ ] Implement search functionality to query BOE number from database
- [ ] Handle search submission and navigation to results

### 5. Screen 2: BOE Summary - Finance Department View
- [ ] Create header with "BOE Summary" title and "Finance Department View" subtitle
- [ ] Add action buttons in header:
  - Export button (outline style)
  - New Search button (primary style)
- [ ] Add metadata bar showing:
  - BE Number (blue, clickable)
  - Filing Date
  - Port Code
  - Status badge (OOC - green success badge)
- [ ] Create 3-column card layout:
  - **BOE & Importer Summary Card**
    - Year, IEC No., GST No., Importer Name, Port Code
  - **Invoice & Assessment Card**
    - Exchange Rate, No. of Invoices, Total Items, Total Assessable (large, blue)
  - **Payment Details Card**
    - Challan No., Payment Date, Amount Paid (large, green)
- [ ] Create full-width Duty Summary card with:
  - 5 pill-style displays (Total BCD, Total IGST, Interest, Penalty, Fine)
  - Total Duty Value at bottom (large, blue)
- [ ] Style cards with proper spacing and borders
- [ ] Fetch data from `boe_header` and `boe_bill_of_summary` tables

### 6. Screen 3: BOE Summary - Compliance Department View
- [ ] Create header with "BOE Summary" and "Compliance Department View"
- [ ] Add metadata bar with PROVISIONAL badge (orange/warning)
- [ ] Create 2-column layout:
  - **BOE & Importer Regulatory Details Card**
    - Year, IEC No., GST No., Importer, AD Code, CHA Name
  - **Origin & Port Details Card**
    - Port Code, Country of Origin, Port of Loading, CHA Name
- [ ] Create full-width **Invoice & Classification Details** card
- [ ] Add data table showing:
  - Invoice No. (clickable/blue), Invoice Date, Supplier, Incoterm, RELTD, SVB CH, SVB No.
- [ ] Style table with hover effects
- [ ] Fetch data from `boe_invoices` table
- [ ] Change user role indicator in sidebar to "Compliance"

### 7. Screen 4: BOE Summary - Accounts Report
- [ ] Create header with "BOE Summary - Accounts Report" title
- [ ] Add three action buttons:
  - Export to Excel (outline)
  - Accounts Report dropdown
  - New Search (primary)
- [ ] Create 2-column top section:
  - BOE & Importer Summary
  - Invoice & Assessment Summary
- [ ] Create 3-column bottom section:
  - **Invoice Summary** (Exchange Rate, Total Items, No. of Invoices, Total Fine, Total Assessable)
  - **Duty Summary** (Total BCD, Total IGST, Interest, Penalty, Fine, Total Duty)
  - **Payment Details** (Challan No., Payment Date, Amount Paid)
- [ ] Implement "Export to Excel" functionality
- [ ] Combine data from multiple tables for comprehensive report

### 8. Screen 5: BOE Summary - Audit Report (Compliance View)
- [ ] Create header with "BOE Summary - Audit Report"
- [ ] Add metadata with two badges: OOC (green) + FINAL (orange)
- [ ] Add Export and "Audit Report" dropdown buttons
- [ ] Create 2-column layout:
  - **BOE & Importer Regulatory Details**
  - **Invent & Classification Details** (table + item breakdown)
- [ ] Add **Duties & Classification Details** table showing:
  - Invoice, Date, Supplier, Incoterm, RELTD, SVB CH, SVB No., H.CESS %, YSSS %, IGST Amnt
  - Table footer with totals row
- [ ] Add **Licence Details** table:
  - Licence Number, Date, Code, Port, Qty, UQC, Debit Value, Debit Duty
- [ ] Fetch data from `boe_additional_details` table
- [ ] Calculate totals dynamically
- [ ] Change sidebar user to "Audit User"

### 9. Screen 6: BOE Summary - Duty Report
- [ ] Create header with "BOE Summary - Duty Report"
- [ ] Add year dropdown filter (2024)
- [ ] Add "Hide zero-value duties" checkbox filter
- [ ] Create **Duty Breakdown** table with blue header:
  - Material Assessable Value, BCD %, BCD Amount, H.CESS %, H.CESS Amount, SWS %, IGST %, IGST Amount, Total Duty
- [ ] Add table footer showing:
  - Total BCD (blue)
  - Total H.CESS (blue)
  - Total Duty (large, blue)
- [ ] Implement filter functionality
- [ ] Fetch data from `boe_duties` table
- [ ] Calculate percentage-based duties dynamically

### 10. Screen 7: Accounts Dashboard (Analytics)
- [ ] Create header with "Accounts Dashboard" title
- [ ] Add date range picker (01 Apr 2024 - 30 Jun 2024)
- [ ] Add "Export Summary" button
- [ ] Create 4-card stats row:
  - **Total Assessable Value** (blue icon, ₹120,456,789, +12.5% trend)
  - **Total Duty Paid** (green icon, ₹18,932,000)
  - **Total IGST** (blue icon, ₹10,220,000)
  - **Outstanding Duty** (orange/warning icon, ₹2,100,000)
- [ ] Create 2-column charts section:
  - **Duty Trend** (bar chart showing Apr-Jun 2024)
  - **Duty Split** (donut chart: BCD 40%, IGST 54%, Others 6%)
- [ ] Create **Top BOEs by Duty** table:
  - BE No., Importer Name, Port Code, Total Duty, Filing Date
- [ ] Implement chart library (Chart.js or Recharts)
- [ ] Aggregate data across date ranges
- [ ] Make charts interactive

### 11. Screen 8: Audit Dashboard
- [ ] Create header with "Audit Dashboard"
- [ ] Add date range picker
- [ ] Create 4-card stats row:
  - Total BOEs Filed (2,450)
  - Provisional BOEs (728, orange)
  - BOEs with Licences (193)
  - BOEs with SVB (112)
- [ ] Create 2-column charts:
  - **BOEs by PRO/FINAL** (bar chart comparing Provisional 728 vs Final 1,722)
  - **BOEs by Country of Origin** (donut: China 32%, USA 25%, Germany 18%, Japan 12%)
- [ ] Create **High-Risk BOEs** table:
  - BE No., Importer Name, Risk Indicator (High badge in red), Port Code, Status
- [ ] Implement risk indicator logic
- [ ] Query compliance-related data
- [ ] Change sidebar user to "Audit User"

### 12. Screen 9: Duty Dashboard
- [ ] Create header with "Duty Dashboard"
- [ ] Add date range picker and Export button
- [ ] Create 4-card stats row:
  - Total Duty (₹22,456,000)
  - Average Duty % (15.6%)
  - Effective Duty Rate (11.2%)
  - Total Assessable Value (₹143,789,512)
- [ ] Create 2-column charts:
  - **Duty % Trend** (line chart showing increasing trend)
  - **Duty by Port** (bar chart: INNSA1, INMAA1, INCCU1, INKOL1)
- [ ] Create **High Duty BOEs** table:
  - BE No., HS Code, Assessable Value, Total Duty, Duty %
- [ ] Calculate duty percentages dynamically
- [ ] Implement trend analysis

### 13. Common Components
- [ ] Create reusable Card component
- [ ] Create reusable Stats component with icon
- [ ] Create reusable Badge component (success, warning, error)
- [ ] Create reusable Button component (primary, outline, secondary)
- [ ] Create reusable Table component with hover effects
- [ ] Create reusable Chart components (Bar, Donut, Line)
- [ ] Create Meta bar component for BOE details
- [ ] Create Date picker component
- [ ] Create Dropdown filter component

### 14.  Endpoints
- [ ] - Search BOE by number
- [ ]  - Get BOE details
- [ ]  - Get summary for specific view (finance/compliance)
- [ ] ` - Get invoice details
- [ ] - Get duty breakdown
- [ ] - Get license details
- [ ]  - Get accounts dashboard data
- [ ] - Get audit dashboard data
- [ ]  - Get duty dashboard data
- [ ] - Export data to Excel
- [ ] - Get aggregated statistics



### 16. Responsive Design
- [ ] Make sidebar collapsible on mobile (<768px)
- [ ] Convert card grids to single column on mobile
- [ ] Make tables horizontally scrollable on mobile
- [ ] Adjust chart sizes for mobile screens
- [ ] Make metadata bar wrap on smaller screens
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on mobile (<768px)

### 17. Additional Features
- [ ] Implement role-based access control (Finance, Compliance, Audit)
- [ ] Add loading states for data fetching
- [ ] Add error handling and error messages
- [ ] Implement empty states for no data
- [ ] Add pagination for large tables
- [ ] Add sorting functionality to tables
- [ ] Add filtering options (date range, port, status)
- [ ] Implement print functionality
- [ ] Add tooltips for data explanations
- [ ] Add breadcrumb navigation