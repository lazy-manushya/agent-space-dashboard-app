"use client";
import useSWR from "swr";
import { IBoeHeader } from "@/types/data";
import {
  IUseBoeHeadersParams,
  IUseBoeHeadersReturn,
} from "./useBoeHeaders.type";

async function fetchBoeHeadersData(url: string): Promise<{
  data: IBoeHeader[];
  total: number;
  page: number;
  limit: number;
}> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} - ${response.statusText}`,
    );
  }

  const result = await response.json();
  return result;
}

export function useBoeHeaders(
  initialParams?: IUseBoeHeadersParams,
): IUseBoeHeadersReturn {
  // Build query string from params
  const buildQueryString = (params?: IUseBoeHeadersParams) => {
    const queryParams = new URLSearchParams();

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const search = params?.search;
    const filters = params?.filters;

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    if (search) {
      queryParams.append("search", search);
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    return queryParams.toString();
  };

  const queryString = buildQueryString(initialParams);
  const apiUrl = `/api/boe-headers?${queryString}`;

  // Use SWR for data fetching
  const {
    data,
    isLoading: isLoadingFromHook,
    error,
    mutate,
  } = useSWR(apiUrl, fetchBoeHeadersData, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000,
  });

  // Extract data or use defaults
  const headers = data?.data || [];
  const total = data?.total || 0;
  const page = data?.page || initialParams?.page || 1;
  const limit = data?.limit || initialParams?.limit || 10;

  const isLoading = isLoadingFromHook && !data;
  const isUpdating = isLoadingFromHook && !!data;

  const noData = !isLoading && (!data || !headers.length);

  const refetch = async (params?: IUseBoeHeadersParams) => {
    const newQueryString = buildQueryString(params || initialParams);
    const newApiUrl: any = `/api/boe-headers?${newQueryString}`;
    await mutate(newApiUrl);
  };

  return {
    data: headers,
    total,
    page,
    limit,
    loading: isLoading,
    updating: isUpdating,
    error: error?.message || null,
    refetch,
    noData,
  };
}
