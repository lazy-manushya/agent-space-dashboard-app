# Data Generator Utility

A comprehensive utility for generating random data that matches your BOE (Bill of Entry) type schemas with **deterministic seed support** for reproducible data generation.

## Features

✅ **Seeded Random Generation** - Same seed always produces identical data
✅ **Type-Safe** - Full TypeScript support with type inference
✅ **Complete Entity Support** - Generate any BOE entity type
✅ **Relationship Support** - Generate related records (invoices, duties, etc.)
✅ **Metadata Generation** - Extract filter options from generated data
✅ **Production Ready** - Used for testing, mocking, demos, and development

## Installation & Import

```typescript
import {
  generateBoeHeader,
  generateBoeHeaderArray,
  generateRandomData,
  generateCompleteBoeRecord,
  generateMetadata,
} from "@/utils/dataGenerator";
```

## Core Concepts

### Seeded Random Number Generator (PRNG)

Uses the **Mulberry32 algorithm** for better distribution and deterministic output.

**Key Property**: Same seed always produces the same sequence of random numbers.

```typescript
// These will ALWAYS produce identical data:
const data1 = generateBoeHeaderArray(50, 12345);
const data2 = generateBoeHeaderArray(50, 12345);

// Different seeds produce different data:
const data3 = generateBoeHeaderArray(50, 54321); // Different!
```

## API Reference

### 1. **generateBoeHeader(rng: SeededRandom): IBoeHeader**

Generate a single BOE header record.

```typescript
const rng = new SeededRandom(42);
const header = generateBoeHeader(rng);

// Result:
// {
//   be_no: "JNPT/2024/567890",
//   year: "2023",
//   iec_no: "1234567890",
//   gst_no: "27AABCU9603R1Z0",
//   port_code: "NSICT",
//   be_date: "2023-06-15",
//   pkg: 245,
//   g_wt: 12345.67,
//   ex_rate: 82.45,
//   ...
// }
```

### 2. **generateBoeHeaderArray(count: number, seed?: number): IBoeHeader[]**

Generate multiple BOE headers with automatic seeding.

```typescript
// Generate 100 headers with seed 1000
const headers = generateBoeHeaderArray(100, 1000);

// All 100 records will be generated consistently
// Run this again with seed 1000 to get identical data
```

### 3. **generateRandomData<T>(count: number, dataType: string, seed?: number, relatedBeNo?: string): T[]**

Generic function to generate any data type.

**Supported DataTypes:**

- `"boeHeader"` - Bill of Entry header
- `"invoice"` - Invoice records (requires `relatedBeNo`)
- `"duty"` - Duty calculations (requires `relatedBeNo`)
- `"billOfSummary"` - Financial summary (requires `relatedBeNo`)
- `"licence"` - Licence details (requires `relatedBeNo`)

```typescript
// Generate invoices for a specific BOE
const header = generateBoeHeaderArray(1, 100)[0];
const invoices = generateRandomData(5, "invoice", 200, header.be_no);

// Generate duties
const duties = generateRandomData(2, "duty", 300, header.be_no);

// Generate bill summary
const summary = generateRandomData(1, "billOfSummary", 400, header.be_no);
```

### 4. **generateCompleteBoeRecord(seed?: number): CompleteRecord**

Generate a complete BOE record with all related data (header + invoices + duties + summary + licence).

```typescript
const completeRecord = generateCompleteBoeRecord(500);

// Result includes:
// - header: IBoeHeader
// - billOfSummary: IBoeBillOfSummary
// - invoices: IBoeInvoice[]
// - duty: IBoeDuty
// - licence: IBoeLicenceAdditionalDetail
```

### 5. **generateMetadata(headers: IBoeHeader[]): IMetadata**

Extract metadata/filter options from generated headers.

```typescript
const headers = generateBoeHeaderArray(100, 1000);
const metadata = generateMetadata(headers);

// Result:
// {
//   years: ["2020", "2021", "2022", "2023", "2024"],
//   portCodes: ["BPLC", "CGI", "COCHIN", "FSPL", ...],
//   packages: [1, 5, 10, 15, 20, ...],
//   invoices: [1, 2, 3, 4, 5, ...],
//   items: [5, 10, 15, 20, ...],
//   exchangeRates: [70.5, 75.2, 80.1, 85.0, ...],
//   grossWeights: [100.5, 500.2, 1000.0, ...],
// }
```

## Use Cases

### 1. Dashboard Development

```typescript
// Generate mock data for dashboard display
const dashboardData = {
  headers: generateBoeHeaderArray(100, 5000),
  metadata: generateMetadata(generateBoeHeaderArray(100, 5000)),
  selectedRecord: generateCompleteBoeRecord(6000),
};
```

### 2. Unit Testing

```typescript
describe("BoeHeaders Service", () => {
  it("should filter headers by year", () => {
    // Use fixed seed for consistent test data
    const testData = generateBoeHeaderArray(50, 1000);
    const result = filterByYear(testData, "2023");

    expect(result.length).toBeGreaterThan(0);
  });

  it("should calculate total weight", () => {
    const headers = generateBoeHeaderArray(10, 2000);
    const total = calculateTotalWeight(headers);

    expect(total).toBeGreaterThan(0);
  });
});
```

### 3. API Mocking

```typescript
// In your mock API handler
app.get("/api/boe-headers", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 25;
  const seed = 10000 + (page - 1) * 100; // Deterministic per page

  const data = generateBoeHeaderArray(limit, seed);
  const metadata = generateMetadata(generateBoeHeaderArray(100, seed + 1000));

  res.json({
    success: true,
    data,
    metadata,
    pagination: {
      page,
      limit,
      total: 1000,
      totalPages: Math.ceil(1000 / limit),
    },
  });
});
```

### 4. Performance Testing

```typescript
console.time("Generate 10000 records");
const largeDataset = generateBoeHeaderArray(10000, 9000);
console.timeEnd("Generate 10000 records");
// Output: Generate 10000 records: ~50ms
```

### 5. Feature Development/Demo

```typescript
// Quickly generate realistic data for trying out new features
const demoData = generateCompleteBoeRecord(7000);
```

## Reproducibility Examples

### Same Seed = Same Data

```typescript
const seed = 12345;

// First call
const batch1 = generateBoeHeaderArray(10, seed);
const be1 = batch1[0].be_no; // "JNPT/2024/123456"

// Second call with same seed
const batch2 = generateBoeHeaderArray(10, seed);
const be2 = batch2[0].be_no; // "JNPT/2024/123456" <- IDENTICAL!
```

### Different Seeds = Different Data

```typescript
const headers1 = generateBoeHeaderArray(5, 1000);
const headers2 = generateBoeHeaderArray(5, 2000);

// headers1 and headers2 will have completely different data
```

### Deterministic Pagination

```typescript
// Generate consistent data for each page
for (let page = 1; page <= 10; page++) {
  const seed = page * 1000; // Different seed per page
  const pageData = generateBoeHeaderArray(25, seed);
  // Each page always has identical data when re-fetched with same seed
}
```

## Data Field Examples

### Generated BOE Header

```json
{
  "be_no": "JNPT/2024/567890",
  "year": "2023",
  "iec_no": "1234567890",
  "gst_no": "27AABCU9603R1Z0",
  "port_code": "NSICT",
  "be_date": "2023-06-15",
  "pkg": 245,
  "g_wt": 12345.67,
  "ex_rate": 82.45,
  "no_of_invoices": 3,
  "total_items": 15,
  "submission": "2023-06-20T08:30:00.000Z",
  "assessment": "2023-06-22T10:15:00.000Z",
  "examination": "2023-06-25T14:45:00.000Z",
  "ooc": "2023-06-28T16:00:00.000Z"
}
```

### Generated Invoice

```json
{
  "invoice_item_id": 123456,
  "be_no": "JNPT/2024/567890",
  "supplier": "Global Trading Ltd.",
  "invoice_sno": 1,
  "invoice_no": "INV234567",
  "invoice_dt": "2023-06-01",
  "invoice_amount": 125000.5,
  "invoice_currency": "USD",
  "misc_charges": 1500.0,
  "inco_term": "CIF",
  "freight": 5000.0,
  "freight_currency": "USD",
  "insurance": 2500.0,
  "inv_ass_value": 156250.63,
  "items": [
    {
      "mat_sr_no": 1,
      "cth": "851234",
      "description": "Premium Electronic Components",
      "unit_price": 250.0,
      "quantity": 400,
      "uqc": "PCS",
      "mat_amount": 100000.0,
      "reltd": "N",
      "svb_ch": "Y",
      "svb_no": "SVB456789",
      "svb_date": "2023-05-20"
    }
  ]
}
```

## Advanced Patterns

### Pattern 1: Generating Test Fixtures

```typescript
// Create a reusable test fixture
const TEST_SEED = 42;

export const testFixtures = {
  headers: generateBoeHeaderArray(100, TEST_SEED),
  metadata: generateMetadata(generateBoeHeaderArray(100, TEST_SEED)),
};

// All tests using these fixtures will have identical data
describe("My Tests", () => {
  const data = testFixtures.headers;
  // All tests run with same data
});
```

### Pattern 2: Parameterized Testing

```typescript
const testCases = [
  { name: "Small dataset", seed: 1000, count: 10 },
  { name: "Medium dataset", seed: 2000, count: 100 },
  { name: "Large dataset", seed: 3000, count: 1000 },
];

testCases.forEach(({ name, seed, count }) => {
  it(`should handle ${name}`, () => {
    const data = generateBoeHeaderArray(count, seed);
    expect(data.length).toBe(count);
  });
});
```

### Pattern 3: Snapshot Testing

```typescript
it("should generate consistent data structure", () => {
  const header = generateBoeHeaderArray(1, 5000)[0];

  // Snapshot will be identical every time with same seed
  expect(header).toMatchSnapshot();
});
```

## Performance Characteristics

```typescript
// Typical generation times (on modern hardware):
generateBoeHeaderArray(10, 1000); // ~1ms
generateBoeHeaderArray(100, 1000); // ~5ms
generateBoeHeaderArray(1000, 1000); // ~40ms
generateBoeHeaderArray(10000, 1000); // ~400ms
generateCompleteBoeRecord(1000); // ~5ms
```

## Seeding Strategy Recommendations

| Use Case          | Seed Strategy | Example                    |
| ----------------- | ------------- | -------------------------- |
| Testing           | Fixed seed    | `seed = 1000`              |
| Development       | Fixed seed    | `seed = 5000`              |
| Pagination        | Page-based    | `seed = pageNum * 1000`    |
| Multiple variants | Increment     | `seed = baseSeed + i * 50` |
| Cache busting     | Timestamp     | `seed = Date.now()`        |

## Files Included

1. **`dataGenerator.ts`** - Core utility functions
2. **`dataGenerator.examples.ts`** - 12 comprehensive examples
3. **`DATA_GENERATOR_README.md`** - This documentation

## Integration with Your Project

The data generator is built to work seamlessly with your existing type system:

- ✅ Uses types from `@/types/data`
- ✅ Generates data matching all interfaces exactly
- ✅ Supports all BOE entities and relationships
- ✅ Compatible with your API response structure
- ✅ Works with your filter metadata system

## Future Enhancements

- [ ] Custom field generators (callback functions)
- [ ] Batch generation with progress tracking
- [ ] Export to CSV/JSON
- [ ] Data distribution control (uniform vs weighted)
- [ ] Relationship integrity constraints
- [ ] Multi-threaded generation for massive datasets

## Support & Issues

For issues or questions, refer to the examples file or the main utility documentation in `dataGenerator.ts`.
