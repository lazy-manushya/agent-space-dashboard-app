/**
 * Data Generator Utility
 * Generates random data matching type schemas with deterministic seed support
 * Ensures reproducible data generation using seeded random number generator
 */

import {
  IBoeHeader,
  IBoeBillOfSummary,
  IBoeInvoice,
  IInvoiceItem,
  IBoeDuty,
  IBoeLicenceAdditionalDetail,
  ILicenceItem,
  IMetadata,
} from "@/types/data";

// ============================================================================
// SEEDED RANDOM NUMBER GENERATOR (PRNG)
// ============================================================================

/**
 * Seeded Pseudo-Random Number Generator using Mulberry32 algorithm
 * Produces deterministic, reproducible random numbers from a seed
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number = 0) {
    this.seed = seed;
  }

  /**
   * Generate next random number between 0 and 1
   * Uses Mulberry32 algorithm for better distribution
   */
  next(): number {
    this.seed = (this.seed + 0x6d2b79f5) >>> 0;
    let t = ((this.seed ^ (this.seed >>> 15)) * 0x1) >>> 0;
    t = (t + (t << 7)) ^ (t << 13);
    t = ((t ^ (t >>> 9)) * 0x1) >>> 0;
    return ((t ^ (t >> 16)) >>> 0) / 4294967296;
  }

  /**
   * Generate random integer between min and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generate random float between min and max
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Pick random element from array
   */
  pickOne<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)];
  }
}

// ============================================================================
// CONSTANT DATA GENERATORS
// ============================================================================

/**
 * Generate random Bill of Entry number (BE Number)
 * Format: Port/Year/SerialNumber (e.g., JNPT/2024/000001)
 */
function generateBeNo(rng: SeededRandom): string {
  const ports = ["JNPT", "NSICT", "ICCT", "FSPL", "BPLC", "CGI"];
  const port = rng.pickOne(ports);
  const year = new Date().getFullYear();
  const serialNo = rng.nextInt(100000, 999999);
  return `${port}/${year}/${serialNo}`;
}

/**
 * Generate random IEC Number (Importer Exporter Code)
 * 10 digit alphanumeric
 */
function generateIecNo(rng: SeededRandom): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars[rng.nextInt(0, chars.length - 1)];
  }
  return result;
}

/**
 * Generate random GST Number
 * Format: 15 character GST ID
 */
function generateGstNo(rng: SeededRandom): string {
  const state = rng.nextInt(1, 37).toString().padStart(2, "0");
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let pan = "";
  for (let i = 0; i < 10; i++) {
    pan += rng.pickOne(chars);
  }
  const entityCode = "1Z5";
  const checksum = rng.nextInt(0, 9);
  return `${state}${pan}${entityCode}${checksum}`;
}

/**
 * Generate random port code
 */
function generatePortCode(rng: SeededRandom): string {
  const portCodes = [
    "JNPT",
    "NSICT",
    "ICCT",
    "FSPL",
    "BPLC",
    "CGI",
    "MUMBAI",
    "NHAVA",
    "COCHIN",
    "CHENNAI",
  ];
  return rng.pickOne(portCodes);
}

/**
 * Generate random date within a range
 */
function generateDate(rng: SeededRandom, daysBack: number = 365): string {
  const now = new Date();
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  const random = new Date(
    past.getTime() + rng.next() * (now.getTime() - past.getTime()),
  );
  return random.toISOString().split("T")[0];
}

/**
 * Generate random year
 */
function generateYear(rng: SeededRandom): string {
  return rng.nextInt(2020, new Date().getFullYear()).toString();
}

/**
 * Generate random company name
 */
function generateCompanyName(rng: SeededRandom): string {
  const firstNames = [
    "Global",
    "International",
    "Premier",
    "United",
    "Advanced",
    "Smart",
  ];
  const lastNames = [
    "Trading",
    "Imports",
    "Exports",
    "Commerce",
    "Logistics",
    "Solutions",
  ];
  return `${rng.pickOne(firstNames)} ${rng.pickOne(lastNames)} Ltd.`;
}

/**
 * Generate random country
 */
function generateCountry(rng: SeededRandom): string {
  const countries = [
    "China",
    "Japan",
    "Germany",
    "USA",
    "UK",
    "Singapore",
    "Thailand",
    "Malaysia",
    "Indonesia",
    "Vietnam",
  ];
  return rng.pickOne(countries);
}

/**
 * Generate random currency code
 */
function generateCurrency(rng: SeededRandom): string {
  const currencies = ["USD", "EUR", "GBP", "JPY", "SGD", "THB", "MYR", "INR"];
  return rng.pickOne(currencies);
}

/**
 * Generate random product description
 */
function generateDescription(rng: SeededRandom): string {
  const adjectives = [
    "High-quality",
    "Premium",
    "Standard",
    "Industrial",
    "Commercial",
  ];
  const products = [
    "Electronic Components",
    "Machinery Parts",
    "Textiles",
    "Chemicals",
    "Minerals",
    "Plastics",
    "Metals",
  ];
  return `${rng.pickOne(adjectives)} ${rng.pickOne(products)}`;
}

/**
 * Generate random CTH (Classification) code
 */
function generateCthCode(rng: SeededRandom): string {
  const chapter = rng.nextInt(1, 99).toString().padStart(2, "0");
  const heading = rng.nextInt(1, 99).toString().padStart(2, "0");
  const subheading = rng.nextInt(1, 99).toString().padStart(2, "0");
  return `${chapter}${heading}${subheading}`;
}

/**
 * Generate random unit of measurement
 */
function generateUqc(rng: SeededRandom): string {
  const units = ["KG", "PCS", "MT", "LTR", "BOX", "BAG", "SET", "ROLL"];
  return rng.pickOne(units);
}

// ============================================================================
// MAIN DATA GENERATORS
// ============================================================================

/**
 * Generate random IBoeHeader record
 */
export function generateBoeHeader(rng: SeededRandom): IBoeHeader {
  return {
    be_no: generateBeNo(rng),
    year: generateYear(rng),
    iec_no: generateIecNo(rng),
    gst_no: generateGstNo(rng),
    port_code: generatePortCode(rng),
    be_date: generateDate(rng),
    pkg: rng.nextInt(1, 500),
    g_wt: rng.nextFloat(100, 50000),
    ex_rate: rng.nextFloat(70, 100),
    no_of_invoices: rng.nextInt(1, 10),
    total_items: rng.nextInt(1, 50),
    submission: generateDate(rng),
    assessment: generateDate(rng),
    examination: generateDate(rng),
    ooc: generateDate(rng),
  };
}

/**
 * Generate random IBoeBillOfSummary record
 */
export function generateBoeBillOfSummary(
  rng: SeededRandom,
  be_no: string,
): IBoeBillOfSummary {
  const totalAssAmount = rng.nextFloat(10000, 1000000);

  return {
    summary_id: rng.nextInt(1, 1000000),
    be_no,
    mode: rng.pickOne(["AIR", "SEA", "RAIL", "ROAD"]),
    ad_code: "AD" + rng.nextInt(1000, 9999),
    importer_name: generateCompanyName(rng),
    country_of_origin: generateCountry(rng),
    country_of_consignment: generateCountry(rng),
    port_of_loading: generatePortCode(rng),

    total_ass_amount: totalAssAmount,
    total_duty_amount: totalAssAmount * 0.15,
    total_bcd: totalAssAmount * 0.07,
    total_h_cess: totalAssAmount * 0.01,
    total_sws: totalAssAmount * 0.005,
    add_duty: totalAssAmount * 0.02,
    total_igst: totalAssAmount * 0.05,
    total_duty: totalAssAmount * 0.15,
    interest: totalAssAmount * 0.002,
    penalty: rng.nextFloat(0, 5000),
    fine: rng.nextFloat(0, 10000),

    mawb_no: "MAWB" + rng.nextInt(100000, 999999),
    mawb_date: generateDate(rng),
    hawb_no: "HAWB" + rng.nextInt(100000, 999999),
    hawb_date: generateDate(rng),

    bond_no: "BOND" + rng.nextInt(10000, 99999),
    bond_port: generatePortCode(rng),
    bond_cd: rng.nextInt(1, 5).toString(),
    debt_amt: rng.nextFloat(0, 50000),
    bg_amt: rng.nextFloat(0, 100000),

    pd_bond_no: "PDB" + rng.nextInt(10000, 99999),
    pd_port: generatePortCode(rng),
    pd_bond_cd: rng.nextInt(1, 5).toString(),
    pd_debt_amt: rng.nextFloat(0, 50000),
    pd_bg_amt: rng.nextFloat(0, 100000),

    igm_no: "IGM" + rng.nextInt(100000, 999999),
    igm_date: generateDate(rng),

    cb_name: generateCompanyName(rng),
    pro_final: rng.pickOne(["CLEARED", "PENDING", "APPROVED", "REJECTED"]),
    payment_mode: rng.pickOne(["NEFT", "CHEQUE", "DD", "CASH"]),
    challan_no: "CHAL" + rng.nextInt(100000, 999999),
    challan_date: generateDate(rng),
    amt: rng.nextFloat(10000, 500000),
  };
}

/**
 * Generate random IInvoiceItem
 */
export function generateInvoiceItem(
  rng: SeededRandom,
  itemNo: number,
): IInvoiceItem {
  const quantity = rng.nextInt(1, 1000);
  const unitPrice = rng.nextFloat(10, 10000);

  return {
    mat_sr_no: itemNo,
    cth: generateCthCode(rng),
    description: generateDescription(rng),
    unit_price: unitPrice,
    quantity,
    uqc: generateUqc(rng),
    mat_amount: quantity * unitPrice,
    reltd: rng.pickOne(["Y", "N"]),
    svb_ch: rng.pickOne(["Y", "N"]),
    svb_no: "SVB" + rng.nextInt(100000, 999999),
    svb_date: generateDate(rng),
  };
}

/**
 * Generate random IBoeInvoice
 */
export function generateBoeInvoice(
  rng: SeededRandom,
  be_no: string,
  invoiceNo: number,
): IBoeInvoice {
  const itemCount = rng.nextInt(1, 10);
  const items: IInvoiceItem[] = [];

  for (let i = 1; i <= itemCount; i++) {
    items.push(generateInvoiceItem(rng, i));
  }

  const invoiceAmount = rng.nextFloat(5000, 500000);

  return {
    invoice_item_id: rng.nextInt(1, 1000000),
    be_no,
    supplier: generateCompanyName(rng),
    invoice_sno: invoiceNo,
    invoice_no: "INV" + rng.nextInt(100000, 999999),
    invoice_dt: generateDate(rng),
    invoice_amount: invoiceAmount,
    invoice_currency: generateCurrency(rng),
    misc_charges: rng.nextFloat(0, 5000),
    inco_term: rng.pickOne(["FOB", "CIF", "CFR", "EXW", "DDP"]),
    freight: rng.nextFloat(100, 50000),
    freight_currency: generateCurrency(rng),
    insurance: rng.nextFloat(0, 10000),
    inv_ass_value: invoiceAmount * rng.nextFloat(1, 1.5),
    items,
  };
}

/**
 * Generate random IBoeDuty
 */
export function generateBoeDuty(rng: SeededRandom, be_no: string): IBoeDuty {
  const matAssessValue = rng.nextFloat(50000, 500000);

  return {
    duty_id: rng.nextInt(1, 1000000),
    be_no,

    bcd_pct: rng.nextFloat(5, 20),
    bcd_amount: matAssessValue * 0.1,
    bcd_duty_fg: rng.pickOne(["Y", "N"]),
    bcd_notn_no: "BCD" + rng.nextInt(10000, 99999),
    bcd_notn_sno: rng.nextInt(1, 100).toString(),

    h_cess_pct: rng.nextFloat(0, 2),
    h_cess_amount: matAssessValue * 0.01,

    sws_pct: rng.nextFloat(0, 1),
    sws_amount: matAssessValue * 0.005,

    igst_pct: rng.nextFloat(5, 28),
    igst_amount: matAssessValue * 0.18,
    igst_notn_no: "IGST" + rng.nextInt(10000, 99999),
    igst_notn_sno: rng.nextInt(1, 100).toString(),

    mat_assess_value: matAssessValue,
    mat_duty: matAssessValue * 0.15,
  };
}

/**
 * Generate random ILicenceItem
 */
export function generateLicenceItem(
  rng: SeededRandom,
  itemNo: number,
): ILicenceItem {
  return {
    licence_item_sl_no: itemNo,
    licence_sl_no: rng.nextInt(1, 100),
    licence_number: "LIC" + rng.nextInt(100000, 999999),
    licence_date: generateDate(rng),
    licence_code: "LC" + rng.nextInt(1000, 9999),
    licence_port: generatePortCode(rng),
    licence_debt_value: rng.nextFloat(0, 50000),
    licence_qty: rng.nextInt(1, 1000),
    licence_uqc: generateUqc(rng),
    licence_debit_duty: rng.nextFloat(0, 10000),
  };
}

/**
 * Generate random IBoeLicenceAdditionalDetail
 */
export function generateBoeLicenceAdditionalDetail(
  rng: SeededRandom,
  be_no: string,
): IBoeLicenceAdditionalDetail {
  const itemCount = rng.nextInt(0, 5);
  const items: ILicenceItem[] = [];

  for (let i = 1; i <= itemCount; i++) {
    items.push(generateLicenceItem(rng, i));
  }

  return {
    licence_id: rng.nextInt(1, 1000000),
    be_no,
    inv_sr_no_lic: rng.nextInt(1, 10),
    licence_items: items.length > 0 ? items : undefined,
  };
}

/**
 * Generate array of random IBoeHeader records
 */
export function generateBoeHeaderArray(
  count: number,
  seed: number = 0,
): IBoeHeader[] {
  const rng = new SeededRandom(seed);
  const headers: IBoeHeader[] = [];

  for (let i = 0; i < count; i++) {
    headers.push(generateBoeHeader(rng));
  }

  return headers;
}

/**
 * Generic random data generator
 * Generates an array of random objects matching a given type shape
 * @param count - Number of records to generate
 * @param dataType - Type of data to generate ('boeHeader', 'invoice', 'duty', etc.)
 * @param seed - Seed for reproducible generation (default: 0)
 * @param relatedBeNo - Optional BE number for related records
 * @returns Array of generated data
 */
export function generateRandomData<T = any>(
  count: number,
  dataType: "boeHeader" | "invoice" | "duty" | "billOfSummary" | "licence",
  seed: number = 0,
  relatedBeNo?: string,
): T[] {
  const rng = new SeededRandom(seed);
  const data: any[] = [];

  for (let i = 0; i < count; i++) {
    let record;

    switch (dataType) {
      case "boeHeader":
        record = generateBoeHeader(rng);
        break;

      case "invoice":
        if (!relatedBeNo) throw new Error("relatedBeNo required for invoices");
        record = generateBoeInvoice(rng, relatedBeNo, i + 1);
        break;

      case "duty":
        if (!relatedBeNo) throw new Error("relatedBeNo required for duties");
        record = generateBoeDuty(rng, relatedBeNo);
        break;

      case "billOfSummary":
        if (!relatedBeNo) throw new Error("relatedBeNo required for summaries");
        record = generateBoeBillOfSummary(rng, relatedBeNo);
        break;

      case "licence":
        if (!relatedBeNo) throw new Error("relatedBeNo required for licences");
        record = generateBoeLicenceAdditionalDetail(rng, relatedBeNo);
        break;

      default:
        throw new Error(`Unknown data type: ${dataType}`);
    }

    data.push(record);
  }

  return data;
}

/**
 * Generate complete BOE record with all related data
 * Returns a complete BOE record hierarchy (header + all related records)
 */
export function generateCompleteBoeRecord(seed: number = 0) {
  const rng = new SeededRandom(seed);

  const header = generateBoeHeader(rng);
  const invoiceCount = rng.nextInt(1, 5);
  const invoices: IBoeInvoice[] = [];

  for (let i = 1; i <= invoiceCount; i++) {
    invoices.push(generateBoeInvoice(rng, header.be_no, i));
  }

  return {
    header,
    billOfSummary: generateBoeBillOfSummary(rng, header.be_no),
    invoices,
    duty: generateBoeDuty(rng, header.be_no),
    licence: generateBoeLicenceAdditionalDetail(rng, header.be_no),
  };
}

/**
 * Generate metadata from BOE headers
 * Useful for filter options
 */
export function generateMetadata(headers: IBoeHeader[]): IMetadata {
  const years = Array.from(new Set(headers.map((h) => h.year))).sort();
  const portCodes = Array.from(new Set(headers.map((h) => h.port_code))).sort();
  const packages = Array.from(new Set(headers.map((h) => h.pkg)))
    .sort((a, b) => a - b)
    .slice(0, 20);
  const invoices = Array.from(new Set(headers.map((h) => h.no_of_invoices)))
    .sort((a, b) => a - b)
    .slice(0, 20);
  const items = Array.from(new Set(headers.map((h) => h.total_items)))
    .sort((a, b) => a - b)
    .slice(0, 20);
  const exchangeRates = Array.from(new Set(headers.map((h) => h.ex_rate)))
    .sort((a, b) => a - b)
    .slice(0, 20);
  const grossWeights = Array.from(new Set(headers.map((h) => h.g_wt)))
    .sort((a, b) => a - b)
    .slice(0, 20);

  return {
    years,
    portCodes,
    packages,
    invoices,
    items,
    exchangeRates,
    grossWeights,
  };
}
