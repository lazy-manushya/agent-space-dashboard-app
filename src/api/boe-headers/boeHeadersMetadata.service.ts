import { IBoeHeader } from "@/pages_lib/DashboardPage/DashboardPage.types";
import boeHeadersData from "@/app/boe_headers.json";
import { IBoeHeaderMetadata } from "./boeHeadersMetadata.service.type.";

/**
 * Fetches unique metadata from BOE headers
 * Returns lists of unique years, port codes, packages, invoices, and items
 */
export async function fetchBoeHeadersMetadata(): Promise<IBoeHeaderMetadata> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const data = [...boeHeadersData] as IBoeHeader[];

  // Extract unique values
  const exchangeRates = Array.from(new Set(data.map((h) => h.ex_rate))).sort();
  const grossWeights = Array.from(new Set(data.map((h) => h.g_wt))).sort();
  const years = Array.from(new Set(data.map((h) => h.year))).sort();
  const portCodes = Array.from(new Set(data.map((h) => h.port_code))).sort();
  const invoices = Array.from(new Set(data.map((h) => h.no_of_invoices))).sort(
    (a, b) => a - b
  );
  const items = Array.from(new Set(data.map((h) => h.total_items))).sort(
    (a, b) => a - b
  );

  return {
    years,
    portCodes,
    invoices,
    items,
    exchangeRates,
    grossWeights,
  };
}
