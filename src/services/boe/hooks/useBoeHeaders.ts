"use client";
import { useState, useCallback, useEffect } from "react";
import { IBoeHeader } from "@/types/data";
import {
  IUseBoeHeadersParams,
  IUseBoeHeadersReturn,
} from "./useBoeHeaders.type";

/**
 * Custom hook to fetch BOE headers
 * Handles loading, error states, and provides refetch functionality
 *
 * Usage:
 * const { data, loading, error, refetch } = useBoeHeaders({ page: 1, limit: 100 });
 */
export function useBoeHeaders(
  initialParams?: IUseBoeHeadersParams,
): IUseBoeHeadersReturn {
  const [data, setData] = useState<IBoeHeader[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialParams?.page || 1);
  const [limit, setLimit] = useState(initialParams?.limit || 10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (params?: IUseBoeHeadersParams) => {
      setLoading(true);
      setError(null);

      try {
        // Build query string
        const queryParams = new URLSearchParams();

        const finalPage = params?.page || page;
        const finalLimit = params?.limit || limit;
        const finalSearch = params?.search;
        const finalFilters = params?.filters;

        queryParams.append("page", finalPage.toString());
        queryParams.append("limit", finalLimit.toString());

        if (finalSearch) {
          queryParams.append("search", finalSearch);
        }

        if (finalFilters) {
          Object.entries(finalFilters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              queryParams.append(key, String(value));
            }
          });
        }

        const response = await fetch(`/api/boe-headers?${queryParams}`);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`,
          );
        }

        const result = await response.json();

        setData(result.data);
        setTotal(result.total);
        setPage(result.page);
        setLimit(result.limit);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching BOE headers:", err);
      } finally {
        setLoading(false);
      }
    },
    [page, limit],
  );

  // Fetch data on component mount and when params change
  useEffect(() => {
    refetch(initialParams);
  }, []);

  return {
    data,
    total,
    page,
    limit,
    loading,
    error,
    refetch,
  };
}
