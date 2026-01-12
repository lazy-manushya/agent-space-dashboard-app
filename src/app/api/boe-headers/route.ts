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

import { fetchBoeHeadersService } from "@/api/boe-headers/boeHeaders.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 100);
    const search = searchParams.get("search") || undefined;

    // Extract filter parameters (e.g., ?year=2024&port_code=INNSA1)
    const filters: Record<string, string> = {};
    const filterableFields = ["year", "port_code", "iec_no", "gst_no"];

    filterableFields.forEach((field) => {
      const value = searchParams.get(field);
      if (value) {
        filters[field] = value;
      }
    });

    // Call the service layer
    const response = await fetchBoeHeadersService({
      page,
      limit,
      search,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    });

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching BOE headers:", error);
    return Response.json(
      { error: "Failed to fetch BOE headers" },
      { status: 500 }
    );
  }
}
