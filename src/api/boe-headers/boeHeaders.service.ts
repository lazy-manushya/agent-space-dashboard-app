import { IBoeHeader } from "@/pages_lib/DashboardPage/DashboardPage.types";

import boeHeadersData from "@/app/boe_headers.json";
import {
  IFetchBoeHeadersParams,
  IFetchBoeHeadersResponse,
} from "./BoeHeaders.types";

/**
 * Simulates fetching BOE headers from a database
 * In a real scenario, this would call your backend API
 */
export async function fetchBoeHeadersService(
  params?: IFetchBoeHeadersParams
): Promise<IFetchBoeHeadersResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let data = [...boeHeadersData] as IBoeHeader[];
  const page = params?.page || 1;
  const limit = params?.limit || 100;

  // Apply search filter if provided
  if (params?.search) {
    const searchTerm = params.search.toLowerCase();
    data = data.filter(
      (header) =>
        header.be_no.toLowerCase().includes(searchTerm) ||
        header.iec_no.toLowerCase().includes(searchTerm) ||
        header.gst_no.toLowerCase().includes(searchTerm)
    );
  }

  // Apply year range filter if provided
  if (params?.filters?.min_year || params?.filters?.max_year) {
    const minYear = params.filters.min_year
      ? parseInt(params.filters.min_year.toString(), 10)
      : null;
    const maxYear = params.filters.max_year
      ? parseInt(params.filters.max_year.toString(), 10)
      : null;

    // Handle edge case: if min_year > max_year, swap them
    let finalMinYear = minYear;
    let finalMaxYear = maxYear;

    if (minYear !== null && maxYear !== null && minYear > maxYear) {
      // Swap the values
      finalMinYear = maxYear;
      finalMaxYear = minYear;
    }

    data = data.filter((header) => {
      const headerYear = parseInt(header.year, 10);

      if (finalMinYear !== null && finalMaxYear !== null) {
        return headerYear >= finalMinYear && headerYear <= finalMaxYear;
      } else if (finalMinYear !== null) {
        return headerYear >= finalMinYear;
      } else if (finalMaxYear !== null) {
        return headerYear <= finalMaxYear;
      }
      return true;
    });
  }

  // Apply additional filters (excluding year filters)
  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      // Skip year filters as they are already handled above
      if (key === "min_year" || key === "max_year") {
        return;
      }
      data = data.filter((header) => {
        const headerValue = (header as Record<string, any>)[key];
        return headerValue?.toString() === value?.toString();
      });
    });
  }

  // Calculate pagination
  const total = data.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total,
    page,
    limit,
  };
}
