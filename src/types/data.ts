/**
 * Central type definitions for all BOE (Bill of Entry) related data
 * All data relationships and structures are defined here
 */

// ============================================================================
// BOE HEADER - Main Bill of Entry Record
// ============================================================================

export interface IBoeHeader {
  be_no: string; // Primary Key: Bill of Entry Number
  year: string; // Year of the Bill of Entry (YYYY format)
  iec_no: string; // Importer Exporter Code
  gst_no: string; // GST Number
  port_code: string; // Port Code
  be_date: string; // Date of Bill of Entry (YYYY-MM-DD format)
  pkg: number; // Number of Packages
  g_wt: number; // Gross Weight (numeric value)
  ex_rate: number; // Exchange Rate (numeric value)
  no_of_invoices: number; // Total number of invoices
  total_items: number; // Total number of items
  submission?: string; // Submission timestamp (ISO format)
  assessment?: string; // Assessment timestamp (ISO format)
  examination?: string; // Examination timestamp (ISO format)
  ooc?: string; // Out of Charge timestamp (ISO format)
}

// ============================================================================
// BOE BILL OF SUMMARY - Financial Summary of Bill of Entry
// ============================================================================

export interface IBoeBillOfSummary {
  summary_id: number; // Primary Key
  be_no: string; // Foreign Key to boe_header
  mode?: string; // Mode of transport (20 chars)
  ad_code?: string; // AD Code (20 chars)
  importer_name?: string; // Importer's name (255 chars)
  country_of_origin?: string; // Country of origin (100 chars)
  country_of_consignment?: string; // Country of consignment (100 chars)
  port_of_loading?: string; // Port of loading (100 chars)

  // Assessment and Duty Amounts
  total_ass_amount?: number; // Total assessment amount
  total_duty_amount?: number; // Total duty amount
  total_bcd?: number; // Total Basic Customs Duty (BCD)
  total_h_cess?: number; // Total Health Cess
  total_sws?: number; // Total Social Welfare Surcharge
  add_duty?: number; // Additional duty
  total_igst?: number; // Total Integrated GST
  total_duty?: number; // Total duty (all types)
  interest?: number; // Interest amount
  penalty?: number; // Penalty amount
  fine?: number; // Fine amount

  // Master Air Waybill Information
  mawb_no?: string; // Master Air Waybill Number
  mawb_date?: string; // MAWB Date (YYYY-MM-DD)
  hawb_no?: string; // House Air Waybill Number
  hawb_date?: string; // HAWB Date (YYYY-MM-DD)

  // Bond Information
  bond_no?: string; // Bond number
  bond_port?: string; // Bond port code
  bond_cd?: string; // Bond code
  debt_amt?: number; // Debt amount
  bg_amt?: number; // Bank Guarantee amount

  // Post-dated Bond Information
  pd_bond_no?: string; // Post-dated bond number
  pd_port?: string; // Post-dated bond port
  pd_bond_cd?: string; // Post-dated bond code
  pd_debt_amt?: number; // Post-dated debt amount
  pd_bg_amt?: number; // Post-dated BG amount

  // IGM Information
  igm_no?: string; // IGM (Import General Manifest) number
  igm_date?: string; // IGM Date (YYYY-MM-DD)

  // Payment Information
  cb_name?: string; // Customs Broker name
  pro_final?: string; // Final processing status
  payment_mode?: string; // Mode of payment
  challan_no?: string; // Challan number
  challan_date?: string; // Challan Date (YYYY-MM-DD)
  amt?: number; // Payment amount
}

// ============================================================================
// BOE INVOICES - Invoice and Item Level Details
// ============================================================================

export interface IInvoiceItem {
  mat_sr_no: number; // Material serial number (part of unique constraint)
  cth?: string; // CTH (Chapter, Heading, Tariff line) Code
  description?: string; // Item description (500 chars)
  unit_price?: number; // Unit price
  quantity?: number; // Quantity of items
  uqc?: string; // Unit of Quantity Code
  mat_amount?: number; // Material amount (quantity × unit_price)
  reltd?: string; // Related flag (Y/N)
  svb_ch?: string; // SVB check flag
  svb_no?: string; // SVB (Special Value Board) number
  svb_date?: string; // SVB Date (YYYY-MM-DD)
}

export interface IBoeInvoice {
  invoice_item_id: number; // Primary Key
  be_no: string; // Foreign Key to boe_header
  supplier?: string; // Supplier name (255 chars)
  invoice_sno: number; // Invoice serial number (part of unique constraint)
  invoice_no?: string; // Invoice number (50 chars)
  invoice_dt?: string; // Invoice Date (YYYY-MM-DD)
  invoice_amount?: number; // Invoice amount
  invoice_currency?: string; // Invoice currency (10 chars)
  misc_charges?: number; // Miscellaneous charges
  inco_term?: string; // INCO term (Incoterms 2020)
  freight?: number; // Freight amount
  freight_currency?: string; // Freight currency
  insurance?: number; // Insurance amount
  inv_ass_value?: number; // Invoice assessment value

  // Additional fields for invoice table display
  importer_name?: string; // Importer name
  risk_indicator?: string; // Risk indicator (Low/Medium/High)
  port_code?: string; // Port code
  status?: string; // Status (Pending/Cleared/etc)

  // Item level details
  items?: IInvoiceItem[];

  // Duty details
  duties?: IBoeDuty[];
}

// ============================================================================
// BOE DUTIES - Duty Calculations and Details
// ============================================================================

export interface IBoeDuty {
  duty_id: number; // Primary Key
  be_no: string; // Foreign Key to boe_header

  // HS Code (CTH)
  hs_code?: string; // Harmonized System Code (CTH)

  // Basic Customs Duty (BCD)
  bcd_pct?: number; // BCD percentage
  bcd_amount?: number; // BCD amount
  bcd_duty_fg?: string; // BCD duty flag
  bcd_notn_no?: string; // BCD notification number
  bcd_notn_sno?: string; // BCD notification serial number

  // Health Cess
  h_cess_pct?: number; // Health cess percentage
  h_cess_amount?: number; // Health cess amount

  // Social Welfare Surcharge (SWS)
  sws_pct?: number; // SWS percentage
  sws_amount?: number; // SWS amount

  // Integrated GST (IGST)
  igst_pct?: number; // IGST percentage
  igst_amount?: number; // IGST amount
  igst_notn_no?: string; // IGST notification number
  igst_notn_sno?: string; // IGST notification serial number

  // Material Assessment
  mat_assess_value?: number; // Material assessment value
  mat_duty?: number; // Material duty amount
}

// ============================================================================
// BOE ADDITIONAL DETAILS - Licence and Additional Information
// ============================================================================

export interface ILicenceItem {
  licence_item_sl_no?: number; // Licence item serial number
  licence_sl_no?: number; // Licence serial number
  licence_number?: string; // Licence number (50 chars)
  licence_date?: string; // Licence Date (YYYY-MM-DD)
  licence_code?: string; // Licence code (20 chars)
  licence_port?: string; // Licence port (20 chars)
  licence_debt_value?: number; // Licence debt value
  licence_qty?: number; // Licence quantity
  licence_uqc?: string; // Licence unit of quantity code (10 chars)
  licence_debit_duty?: number; // Licence debit duty
}

export interface IBoeLicenceAdditionalDetail {
  licence_id: number; // Primary Key
  be_no: string; // Foreign Key to boe_header
  inv_sr_no_lic?: number; // Invoice serial number for licence
  licence_items?: ILicenceItem[];
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface IFetchBoeHeadersResponse {
  data: IBoeHeader[];
  total: number;
  page: number;
  limit: number;
}

export interface IFetchBoeHeadersParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Record<string, string | number>;
}

export interface IMetadata {
  years: string[];
  portCodes: string[];
  packages: number[];
  invoices: number[];
  items: number[];
  exchangeRates: number[];
  grossWeights: number[];
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface IYearRangeFilter {
  min_year?: string | number;
  max_year?: string | number;
}

export interface IWeightRangeFilter {
  min_g_weight?: string | number;
  max_g_weight?: string | number;
}

export interface IExchangeRateRangeFilter {
  min_ex_rate?: string | number;
  max_ex_rate?: string | number;
}

export interface IDateRangeFilter {
  start_date?: string; // ISO format date
  end_date?: string; // ISO format date
}

export interface IBasicFilter {
  search?: string;
  port_code?: string;
  packages?: string | number;
  no_of_invoices?: string | number;
  iec_no?: string;
  gst_no?: string;
}

export type IAllFilters = IYearRangeFilter &
  IWeightRangeFilter &
  IExchangeRateRangeFilter &
  IDateRangeFilter &
  IBasicFilter;

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface IPaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ============================================================================
// DASHBOARD STATE TYPES
// ============================================================================

export interface IDashboardFilterState {
  searchTerm: string;
  selectedMinYear: string;
  selectedMaxYear: string;
  selectedPort: string;
  selectedPackages: string;
  selectedInvoices: string;
  selectedMinGWeight?: string;
  selectedMaxGWeight?: string;
  selectedMinExRate?: string;
  selectedMaxExRate?: string;
  selectedStartDate?: string;
  selectedEndDate?: string;
}

export interface IDashboardDataState {
  boeHeaders: IBoeHeader[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

export interface IDashboardMetadataState {
  metadata: IMetadata | null;
  loading: boolean;
  error: string | null;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type KeyOfBoeHeader = keyof IBoeHeader;

export interface ITableColumn<T> {
  key: KeyOfBoeHeader;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: IBoeHeader) => React.ReactNode;
}

export interface IApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// ============================================================================
// EXPORT TYPE GUARDS
// ============================================================================

export function isBoeHeader(obj: any): obj is IBoeHeader {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.be_no === "string" &&
    typeof obj.year === "string" &&
    typeof obj.iec_no === "string"
  );
}

export function isBoeHeaderArray(obj: any): obj is IBoeHeader[] {
  return Array.isArray(obj) && obj.every(isBoeHeader);
}
