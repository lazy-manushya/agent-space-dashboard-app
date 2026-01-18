/**
 * Data Generator Integration Guide
 * Shows how to integrate the data generator into your API endpoints
 */

import React from "react";
import {
  generateBoeHeaderArray,
  generateRandomData,
  generateMetadata,
  generateCompleteBoeRecord,
} from "@/utils/dataGenerator";
import type { IBoeHeader, IFetchBoeHeadersResponse } from "@/types/data";

// ============================================================================
// EXAMPLE 1: API Route Handler with Mock Data
// ============================================================================

/**
 * Example API handler: /api/boe-headers
 * Replace with your actual API implementation or use for mocking
 */
export async function handleGetBoeHeaders(
  page: number = 1,
  limit: number = 25,
  seed?: number,
): Promise<IFetchBoeHeadersResponse> {
  // Use provided seed or generate deterministic seed from pagination
  const determinedSeed = seed || page * 1000;

  // Generate page data
  const data = generateBoeHeaderArray(limit, determinedSeed);

  // Generate metadata from a larger base dataset
  const allData = generateBoeHeaderArray(500, determinedSeed + 10000);
  const metadata = generateMetadata(allData);

  return {
    data,
    total: 1000, // Mock total count
    page,
    limit,
  };
}

// ============================================================================
// EXAMPLE 2: Integration with Next.js API Route
// ============================================================================

/**
 * app/api/boe-headers/route.ts
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const seed = parseInt(searchParams.get("seed") || "0", 10);

    const response = await handleGetBoeHeaders(page, limit, seed);

    return Response.json({
      success: true,
      ...response,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// ============================================================================
// EXAMPLE 3: API Route for Detailed Record
// ============================================================================

/**
 * app/api/boe-headers/[beNo]/route.ts
 * Get a complete BOE record with all related data
 */
export async function getDetailedBoeRecord(beNo: string) {
  // Generate seed based on BE number for consistency
  const seed = beNo
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const completeRecord = generateCompleteBoeRecord(seed);

  return {
    success: true,
    data: {
      ...completeRecord.header,
      // Include related data if needed
      billOfSummary: completeRecord.billOfSummary,
      invoices: completeRecord.invoices,
      duty: completeRecord.duty,
      licence: completeRecord.licence,
    },
  };
}

// ============================================================================
// EXAMPLE 4: Metadata Endpoint
// ============================================================================

/**
 * app/api/boe-headers/metadata/route.ts
 * Get filter options
 */
export async function getMetadata() {
  // Generate metadata with fixed seed for consistency
  const headers = generateBoeHeaderArray(500, 5000);
  const metadata = generateMetadata(headers);

  return {
    success: true,
    data: metadata,
  };
}

// ============================================================================
// EXAMPLE 5: Search/Filter Implementation
// ============================================================================

/**
 * Filter headers based on criteria
 * Can be used with generated or real data
 */
export function filterHeaders(
  headers: IBoeHeader[],
  filters: Record<string, any>,
): IBoeHeader[] {
  return headers.filter((header) => {
    // Year filter
    if (filters.year && header.year !== filters.year) {
      return false;
    }

    // Port code filter
    if (filters.port_code && header.port_code !== filters.port_code) {
      return false;
    }

    // Date range filter
    if (filters.start_date && header.be_date < filters.start_date) {
      return false;
    }
    if (filters.end_date && header.be_date > filters.end_date) {
      return false;
    }

    // Weight range filter
    if (filters.min_g_weight && header.g_wt < filters.min_g_weight) {
      return false;
    }
    if (filters.max_g_weight && header.g_wt > filters.max_g_weight) {
      return false;
    }

    // Exchange rate range filter
    if (filters.min_ex_rate && header.ex_rate < filters.min_ex_rate) {
      return false;
    }
    if (filters.max_ex_rate && header.ex_rate > filters.max_ex_rate) {
      return false;
    }

    return true;
  });
}

// ============================================================================
// EXAMPLE 6: Search with Generated Data
// ============================================================================

/**
 * Search implementation with mock data
 */
export async function searchBoeHeaders(
  searchTerm: string,
  page: number = 1,
  limit: number = 25,
): Promise<IFetchBoeHeadersResponse> {
  // Generate all available data
  const allData = generateBoeHeaderArray(1000, 9000);

  // Filter by search term
  const filtered = allData.filter((header) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      header.be_no.toLowerCase().includes(searchLower) ||
      header.iec_no.toLowerCase().includes(searchLower) ||
      header.port_code.toLowerCase().includes(searchLower)
    );
  });

  // Paginate
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total: filtered.length,
    page,
    limit,
  };
}

// ============================================================================
// EXAMPLE 7: Using Generated Data in React Component
// ============================================================================

/**
 * React component using generated data
 *
 * import React from "react";
 *
 * export function ExampleComponent() {
 *   const [headers, setHeaders] = React.useState<IBoeHeader[]>([]);
 *   const [metadata, setMetadata] = React.useState<any>(null);
 *
 *   React.useEffect(() => {
 *     const seed = 12345;
 *     const generatedHeaders = generateBoeHeaderArray(100, seed);
 *     const generatedMetadata = generateMetadata(generatedHeaders);
 *
 *     setHeaders(generatedHeaders);
 *     setMetadata(generatedMetadata);
 *   }, []);
 *
 *   return (
 *     <div>
 *       <h1>BOE Headers ({headers.length})</h1>
 *       {metadata && (
 *         <div>
 *           <p>Years: {metadata.years.join(", ")}</p>
 *           <p>Ports: {metadata.portCodes.join(", ")}</p>
 *         </div>
 *       )}
 *       <table>
 *         <tbody>
 *           {headers.map((header) => (
 *             <tr key={header.be_no}>
 *               <td>{header.be_no}</td>
 *               <td>{header.year}</td>
 *               <td>{header.port_code}</td>
 *               <td>{header.g_wt.toFixed(2)}</td>
 *             </tr>
 *           ))}
 *         </tbody>
 *       </table>
 *     </div>
 *   );
 * }
 */

// ============================================================================
// EXAMPLE 8: Test Data Generator for Service Testing
// ============================================================================

/**
 * Generate test fixtures for your services
 */
export const testDataFixtures = {
  // Single records
  singleHeader: generateBoeHeaderArray(1, 1000)[0],
  completeRecord: generateCompleteBoeRecord(2000),

  // Multiple records
  headers50: generateBoeHeaderArray(50, 3000),
  headers100: generateBoeHeaderArray(100, 4000),
  headers1000: generateBoeHeaderArray(1000, 5000),

  // Related records
  getInvoicesFor: (beNo: string, count: number = 5) =>
    generateRandomData(count, "invoice", 6000, beNo),
  getDutiesFor: (beNo: string, count: number = 2) =>
    generateRandomData(count, "duty", 7000, beNo),

  // Metadata
  metadata: (() => {
    const headers = generateBoeHeaderArray(100, 8000);
    return generateMetadata(headers);
  })(),
};

// ============================================================================
// EXAMPLE 9: Migration Path - From Mock to Real API
// ============================================================================

/**
 * Service that works with both mock and real data
 * Easy to switch between mock and real API
 */
class BoeHeadersService {
  private useMock: boolean = true; // Toggle to switch between mock/real
  private apiBaseUrl: string = "/api";

  async fetchHeaders(page: number = 1, limit: number = 25) {
    if (this.useMock) {
      // Use generated mock data
      return handleGetBoeHeaders(page, limit);
    } else {
      // Use real API
      const response = await fetch(
        `${this.apiBaseUrl}/boe-headers?page=${page}&limit=${limit}`,
      );
      return response.json();
    }
  }

  async getMetadata() {
    if (this.useMock) {
      const headers = generateBoeHeaderArray(500, 5000);
      return generateMetadata(headers);
    } else {
      const response = await fetch(`${this.apiBaseUrl}/boe-headers/metadata`);
      return response.json();
    }
  }

  // Easy to switch: useMock = false to use real API
  setUseMock(use: boolean) {
    this.useMock = use;
  }
}

// ============================================================================
// USAGE IN YOUR PROJECT
// ============================================================================

/**
 * In your boeHeaders.service.ts, you can use:
 *
 * // Option 1: For development/testing
 * const data = generateBoeHeaderArray(25, 1000);
 *
 * // Option 2: In API route
 * export async function GET(request: Request) {
 *   const response = await handleGetBoeHeaders(page, limit);
 *   return Response.json(response);
 * }
 *
 * // Option 3: In React hook
 * const [headers] = useState(() => generateBoeHeaderArray(100, seed));
 */
