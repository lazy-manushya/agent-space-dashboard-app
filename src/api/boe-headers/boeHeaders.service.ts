import {
  IBoeHeader,
  IFetchBoeHeadersParams,
  IFetchBoeHeadersResponse,
} from "@/types/data";

import boeHeadersData from "@/app/boe_headers.json";

/**
 * Simulates fetching BOE headers from a database
 * In a real scenario, this would call your backend API
 */
export async function fetchBoeHeadersService(
  params?: IFetchBoeHeadersParams,
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
        header.gst_no.toLowerCase().includes(searchTerm),
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

  // Apply gross weight range filter if provided
  if (params?.filters?.min_g_weight || params?.filters?.max_g_weight) {
    const minGWeight = params.filters.min_g_weight
      ? parseInt(params.filters.min_g_weight.toString(), 10)
      : null;
    const maxGWeight = params.filters.max_g_weight
      ? parseInt(params.filters.max_g_weight.toString(), 10)
      : null;

    // Handle edge case: if min_g_weight > max_g_weight, swap them
    let finalMinGWeight = minGWeight;
    let finalMaxGWeight = maxGWeight;

    if (minGWeight !== null && maxGWeight !== null && minGWeight > maxGWeight) {
      // Swap the values
      finalMinGWeight = maxGWeight;
      finalMaxGWeight = minGWeight;
    }

    data = data.filter((header) => {
      const headerGWeight = header.g_wt; // Already a number

      if (finalMinGWeight !== null && finalMaxGWeight !== null) {
        return (
          headerGWeight >= finalMinGWeight && headerGWeight <= finalMaxGWeight
        );
      } else if (finalMinGWeight !== null) {
        return headerGWeight >= finalMinGWeight;
      } else if (finalMaxGWeight !== null) {
        return headerGWeight <= finalMaxGWeight;
      }
      return true;
    });
  }

  // Apply exchange rate range filter if provided
  if (params?.filters?.min_ex_rate || params?.filters?.max_ex_rate) {
    const minExRate = params.filters.min_ex_rate
      ? parseFloat(params.filters.min_ex_rate.toString())
      : null;
    const maxExRate = params.filters.max_ex_rate
      ? parseFloat(params.filters.max_ex_rate.toString())
      : null;

    // Handle edge case: if min_ex_rate > max_ex_rate, swap them
    let finalMinExRate = minExRate;
    let finalMaxExRate = maxExRate;

    if (minExRate !== null && maxExRate !== null && minExRate > maxExRate) {
      // Swap the values
      finalMinExRate = maxExRate;
      finalMaxExRate = minExRate;
    }

    data = data.filter((header) => {
      const headerExRate = header.ex_rate; // Already a number

      if (finalMinExRate !== null && finalMaxExRate !== null) {
        return headerExRate >= finalMinExRate && headerExRate <= finalMaxExRate;
      } else if (finalMinExRate !== null) {
        return headerExRate >= finalMinExRate;
      } else if (finalMaxExRate !== null) {
        return headerExRate <= finalMaxExRate;
      }
      return true;
    });
  }

  // Apply date range filter if provided
  if (params?.filters?.start_date || params?.filters?.end_date) {
    const startDateStr = params.filters.start_date?.toString();
    const endDateStr = params.filters.end_date?.toString();

    console.log("=== DATE FILTER DEBUG ===");
    console.log("Start date string from filter:", startDateStr);
    console.log("End date string from filter:", endDateStr);

    // Convert filter dates to YYYY-MM-DD format (extract date part only)
    const extractDatePart = (dateStr: string) => {
      // If format is like "2026-01-17" or "2026-01-17T14:30:00[America/Los_Angeles]"
      // Extract just the YYYY-MM-DD part
      return dateStr.split("T")[0];
    };

    const startDate = startDateStr ? extractDatePart(startDateStr) : null;
    const endDate = endDateStr ? extractDatePart(endDateStr) : null;

    console.log("Extracted start date (YYYY-MM-DD):", startDate);
    console.log("Extracted end date (YYYY-MM-DD):", endDate);
    console.log("Sample be_date from data:", data[0]?.be_date);

    data = data.filter((header) => {
      const headerDate = header.be_date; // Already in YYYY-MM-DD format

      if (startDate && endDate) {
        const result = headerDate >= startDate && headerDate <= endDate;
        if (!result) {
          console.log(
            `Filtered out: ${header.be_no} with date ${headerDate} (not in range ${startDate} to ${endDate})`,
          );
        }
        return result;
      } else if (startDate) {
        return headerDate >= startDate;
      } else if (endDate) {
        return headerDate <= endDate;
      }
      return true;
    });

    console.log("Filtered data count:", data.length);
    console.log("=== END DATE FILTER DEBUG ===");
  }

  // Apply additional filters (excluding year filters)
  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      // Skip year filters as they are already handled above
      if (key === "min_year" || key === "max_year") {
        return;
      }
      if (key === "min_g_weight" || key === "max_g_weight") {
        return;
      }
      if (key === "min_ex_rate" || key === "max_ex_rate") {
        return;
      }
      // Skip date range filters as they are already handled above
      if (key === "start_date" || key === "end_date") {
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
