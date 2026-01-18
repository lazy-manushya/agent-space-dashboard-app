/**
 * API Route Handler for BOE Headers
 * Endpoint: GET /api/boe-headers
 *
 * Query Parameters:
 * - page: number (optional, default: 1)
 * - limit: number (optional, default: 10)
 * - search: string (optional)
 * - filters: Record<string, string> (optional)
 */

import {
  generateBoeHeaderArray,
  generateRandomData,
  generateMetadata,
  generateCompleteBoeRecord,
} from "@/utils/dataGenerator";
import type { IBoeHeader, IFetchBoeHeadersResponse } from "@/types/data";

/**
 * Apply filters to BOE header data
 */
function applyFilters(
  headers: IBoeHeader[],
  filters: Record<string, string>,
): IBoeHeader[] {
  return headers.filter((header) => {
    // Year filter
    if (filters.year && header.year !== filters.year) {
      return false;
    }

    // Year range filters
    if (
      filters.min_year &&
      parseInt(header.year, 10) < parseInt(filters.min_year, 10)
    ) {
      return false;
    }
    if (
      filters.max_year &&
      parseInt(header.year, 10) > parseInt(filters.max_year, 10)
    ) {
      return false;
    }

    // Port code filter
    if (filters.port_code && header.port_code !== filters.port_code) {
      return false;
    }

    // IEC number filter
    if (filters.iec_no && !header.iec_no.includes(filters.iec_no)) {
      return false;
    }

    // GST number filter
    if (filters.gst_no && !header.gst_no.includes(filters.gst_no)) {
      return false;
    }

    // Number of invoices filter
    if (
      filters.no_of_invoices &&
      header.no_of_invoices !== parseInt(filters.no_of_invoices, 10)
    ) {
      return false;
    }

    // Total items filter
    if (
      filters.total_items &&
      header.total_items !== parseInt(filters.total_items, 10)
    ) {
      return false;
    }

    // Gross weight range filters
    if (
      filters.min_g_weight &&
      header.g_wt < parseFloat(filters.min_g_weight)
    ) {
      return false;
    }
    if (
      filters.max_g_weight &&
      header.g_wt > parseFloat(filters.max_g_weight)
    ) {
      return false;
    }

    // Exchange rate range filters
    if (
      filters.min_ex_rate &&
      header.ex_rate < parseFloat(filters.min_ex_rate)
    ) {
      return false;
    }
    if (
      filters.max_ex_rate &&
      header.ex_rate > parseFloat(filters.max_ex_rate)
    ) {
      return false;
    }

    // Date range filters
    if (filters.start_date && header.be_date < filters.start_date) {
      return false;
    }
    if (filters.end_date && header.be_date > filters.end_date) {
      return false;
    }

    // Search filter (searches across multiple fields)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        header.be_no.toLowerCase().includes(searchLower) ||
        header.iec_no.toLowerCase().includes(searchLower) ||
        header.gst_no.toLowerCase().includes(searchLower) ||
        header.port_code.toLowerCase().includes(searchLower);

      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });
}

export async function handleGetBoeHeaders(
  page: number = 1,
  limit: number = 25,
  seed?: number,
  filters?: Record<string, string>,
): Promise<IFetchBoeHeadersResponse> {
  // Use provided seed or generate deterministic seed from pagination
  const determinedSeed = seed || page * 1000;

  // Generate larger dataset to apply filters on
  const allData = generateBoeHeaderArray(1000, determinedSeed + 10000);

  // Apply filters if provided
  let filteredData = allData;
  if (filters && Object.keys(filters).length > 0) {
    filteredData = applyFilters(allData, filters);
  }

  // Calculate total after filtering
  const total = filteredData.length;

  // Apply pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filteredData.slice(start, end);

  // Generate metadata from all data
  const metadata = generateMetadata(allData);
  console.log("DEBUG:", { metadata });

  return {
    data,
    total,
    page,
    limit,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const seed = parseInt(searchParams.get("seed") || "0", 10);

    // Extract filter parameters
    const filters: Record<string, string> = {};
    const filterableFields = [
      "year",
      "port_code",
      "iec_no",
      "gst_no",
      "no_of_invoices",
      "total_items",
      "be_date",
      "min_year",
      "max_year",
      "min_g_weight",
      "max_g_weight",
      "min_ex_rate",
      "max_ex_rate",
      "start_date",
      "end_date",
      "search",
    ];

    filterableFields.forEach((field) => {
      const value = searchParams.get(field);
      if (value) {
        filters[field] = value;
      }
    });

    console.log("DEBUG", { filterableFields, filters });

    const response = await handleGetBoeHeaders(
      page,
      limit,
      seed,
      Object.keys(filters).length > 0 ? filters : undefined,
    );

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
