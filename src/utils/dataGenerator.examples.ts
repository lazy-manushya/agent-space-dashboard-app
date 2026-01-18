/**
 * Data Generator Examples and Usage Guide
 * Demonstrates how to use the dataGenerator utility
 */

import {
  generateBoeHeader,
  generateBoeInvoice,
  generateBoeBillOfSummary,
  generateBoeDuty,
  generateBoeLicenceAdditionalDetail,
  generateBoeHeaderArray,
  generateRandomData,
  generateCompleteBoeRecord,
  generateMetadata,
} from "@/utils/dataGenerator";
import type {
  IBoeHeader,
  IBoeInvoice,
  IBoeBillOfSummary,
  IBoeDuty,
  IBoeLicenceAdditionalDetail,
} from "@/types/data";

// ============================================================================
// EXAMPLE 1: Generate Single Records with Seed
// ============================================================================

/**
 * Generate a single BOE header with reproducible data
 * Same seed always produces identical data
 */
export function example_generateSingleHeader() {
  // Using seed 42 will always produce the same header
  const header = generateBoeHeader(new (require("seedrandom"))(42));

  console.log("Generated BOE Header:", header);
  /*
   * Output example:
   * {
   *   be_no: "JNPT/2024/567890",
   *   year: "2023",
   *   iec_no: "1234567890",
   *   gst_no: "27AABCU9603R1Z0",
   *   port_code: "NSICT",
   *   be_date: "2023-06-15",
   *   pkg: 245,
   *   g_wt: 12345.67,
   *   ex_rate: 82.45,
   *   ...
   * }
   */
}

// ============================================================================
// EXAMPLE 2: Generate Array of Records
// ============================================================================

/**
 * Generate multiple BOE headers with consistent seeding
 * Useful for dashboard data or testing
 */
export function example_generateMultipleHeaders() {
  const count = 50;
  const seed = 12345; // Fixed seed for reproducibility

  const headers = generateBoeHeaderArray(count, seed);

  console.log(`Generated ${headers.length} BOE headers`);
  console.log("First header:", headers[0]);
  console.log("Last header:", headers[headers.length - 1]);

  return headers;
}

// ============================================================================
// EXAMPLE 3: Generate Related Records
// ============================================================================

/**
 * Generate invoices for a specific BOE header
 */
export function example_generateRelatedInvoices() {
  // First generate a header
  const header = generateBoeHeaderArray(1, 100)[0];

  // Then generate invoices for this header
  const invoices: IBoeInvoice[] = generateRandomData(
    5, // Generate 5 invoices
    "invoice",
    200, // Different seed
    header.be_no, // Link to header
  );

  console.log(`Generated ${invoices.length} invoices for BE: ${header.be_no}`);
  invoices.forEach((inv, i) => {
    console.log(`  Invoice ${i + 1}:`, {
      invoice_no: inv.invoice_no,
      amount: inv.invoice_amount,
      items: inv.items?.length,
    });
  });

  return { header, invoices };
}

// ============================================================================
// EXAMPLE 4: Generate Complete BOE Record
// ============================================================================

/**
 * Generate a complete BOE record hierarchy with all related data
 */
export function example_generateCompleteBoe() {
  const seed = 500;
  const completeRecord = generateCompleteBoeRecord(seed);

  console.log("Complete BOE Record:");
  console.log("Header:", completeRecord.header);
  console.log("Bill of Summary:", completeRecord.billOfSummary);
  console.log(`Invoices: ${completeRecord.invoices.length} items`);
  console.log("Duty:", completeRecord.duty);
  console.log("Licence:", completeRecord.licence);

  return completeRecord;
}

// ============================================================================
// EXAMPLE 5: Generate Metadata for Filters
// ============================================================================

/**
 * Generate metadata from BOE headers for filter options
 */
export function example_generateMetadata() {
  // Generate some headers first
  const headers = generateBoeHeaderArray(100, 999);

  // Extract metadata for filter UI
  const metadata = generateMetadata(headers);

  console.log("Metadata for Filters:");
  console.log("Years:", metadata.years);
  console.log("Port Codes:", metadata.portCodes);
  console.log("Available Package Counts:", metadata.packages.slice(0, 10));
  console.log("Available Exchange Rates:", metadata.exchangeRates.slice(0, 5));

  return { headers, metadata };
}

// ============================================================================
// EXAMPLE 6: Reproducible Data Generation (Key Feature!)
// ============================================================================

/**
 * Demonstrates reproducibility with seeds
 * Same seed always produces identical data
 */
export function example_reproducibleGeneration() {
  const SEED = 12345;

  // Generate data twice with same seed
  const batch1 = generateBoeHeaderArray(10, SEED);
  const batch2 = generateBoeHeaderArray(10, SEED);

  // Verify they're identical
  const isIdentical = batch1.every(
    (header, i) => JSON.stringify(header) === JSON.stringify(batch2[i]),
  );

  console.log("Same seed produces identical data:", isIdentical); // true
  console.log("First record from batch 1:", batch1[0]);
  console.log("First record from batch 2:", batch2[0]);
  console.log(
    "Are they equal?",
    JSON.stringify(batch1[0]) === JSON.stringify(batch2[0]),
  );

  return { isIdentical, batch1, batch2 };
}

// ============================================================================
// EXAMPLE 7: Generate Data for Different Purposes
// ============================================================================

/**
 * Generate test data for unit tests
 */
export function example_generateTestData() {
  const testData = {
    // Static seed for consistent test data
    boeHeaders: generateBoeHeaderArray(5, 1000),

    // Related records for first header
    invoices: generateRandomData<IBoeInvoice>(
      3,
      "invoice",
      1001,
      generateBoeHeaderArray(1, 1000)[0].be_no,
    ),

    duties: generateRandomData<IBoeDuty>(
      2,
      "duty",
      1002,
      generateBoeHeaderArray(1, 1000)[0].be_no,
    ),
  };

  console.log("Test Data Generated:");
  console.log(`Headers: ${testData.boeHeaders.length}`);
  console.log(`Invoices: ${testData.invoices.length}`);
  console.log(`Duties: ${testData.duties.length}`);

  return testData;
}

// ============================================================================
// EXAMPLE 8: Generate Data for Dashboard Development
// ============================================================================

/**
 * Generate realistic dashboard data
 */
export function example_generateDashboardData() {
  const dashboardData = {
    // Generate headers for table display
    headers: generateBoeHeaderArray(100, 5000),

    // Generate metadata for filters
    metadata: generateMetadata(generateBoeHeaderArray(100, 5000)),

    // Generate specific record with full details for detail view
    detailRecord: generateCompleteBoeRecord(6000),
  };

  return {
    totalRecords: dashboardData.headers.length,
    filterOptions: dashboardData.metadata,
    selectedRecord: dashboardData.detailRecord,
  };
}

// ============================================================================
// EXAMPLE 9: Stream-like Generation (Pagination)
// ============================================================================

/**
 * Generate data in batches for paginated loading
 */
export function example_paginatedGeneration() {
  const pageSize = 25;
  const totalPages = 4;

  const paginatedData = Array.from({ length: totalPages }, (_, pageIndex) => {
    // Use different seed for each page but consistent order
    const seed = pageIndex * 1000 + 7000;
    return generateBoeHeaderArray(pageSize, seed);
  });

  console.log(
    `Generated ${paginatedData.length} pages of ${pageSize} items each`,
  );

  return paginatedData;
}

// ============================================================================
// EXAMPLE 10: Custom Seed Strategies
// ============================================================================

/**
 * Generate data with deterministic variant seeds
 * Useful for generating multiple variations of similar data
 */
export function example_seedVariants() {
  const baseSeed = 100;
  const variants: IBoeHeader[] = [];

  // Generate 5 variants of similar data
  for (let i = 0; i < 5; i++) {
    const seed = baseSeed + i * 50; // Spread seeds for variation
    const header = generateBoeHeaderArray(1, seed)[0];
    variants.push(header);
  }

  console.log("Generated 5 variants with different seeds:");
  variants.forEach((v, i) => {
    console.log(`Variant ${i + 1}: BE ${v.be_no}, Year: ${v.year}`);
  });

  return variants;
}

// ============================================================================
// EXAMPLE 11: Integration with Mock API
// ============================================================================

/**
 * Example of using generated data in a mock API response
 */
export function example_mockApiResponse() {
  const mockResponse = {
    success: true,
    data: generateBoeHeaderArray(25, 8000),
    metadata: generateMetadata(generateBoeHeaderArray(25, 8000)),
    pagination: {
      page: 1,
      limit: 25,
      total: 1000,
      totalPages: 40,
    },
  };

  return mockResponse;
}

// ============================================================================
// EXAMPLE 12: Performance Testing
// ============================================================================

/**
 * Generate large dataset for performance testing
 */
export function example_performanceTestData() {
  console.time("Generate 10000 records");
  const largeDataset = generateBoeHeaderArray(10000, 9000);
  console.timeEnd("Generate 10000 records");

  console.time("Generate metadata");
  const metadata = generateMetadata(largeDataset);
  console.timeEnd("Generate metadata");

  return { recordCount: largeDataset.length, metadata };
}

/**
 * Run all examples
 */
export function runAllExamples() {
  console.log("\n=== EXAMPLE 1: Single Header ===");
  example_generateSingleHeader();

  console.log("\n=== EXAMPLE 2: Multiple Headers ===");
  example_generateMultipleHeaders();

  console.log("\n=== EXAMPLE 3: Related Invoices ===");
  example_generateRelatedInvoices();

  console.log("\n=== EXAMPLE 4: Complete BOE ===");
  example_generateCompleteBoe();

  console.log("\n=== EXAMPLE 5: Metadata ===");
  example_generateMetadata();

  console.log("\n=== EXAMPLE 6: Reproducibility ===");
  example_reproducibleGeneration();

  console.log("\n=== EXAMPLE 7: Test Data ===");
  example_generateTestData();

  console.log("\n=== EXAMPLE 8: Dashboard Data ===");
  example_generateDashboardData();

  console.log("\n=== EXAMPLE 9: Paginated Data ===");
  example_paginatedGeneration();

  console.log("\n=== EXAMPLE 10: Seed Variants ===");
  example_seedVariants();

  console.log("\n=== EXAMPLE 11: Mock API Response ===");
  example_mockApiResponse();

  console.log("\n=== EXAMPLE 12: Performance Test ===");
  example_performanceTestData();
}
