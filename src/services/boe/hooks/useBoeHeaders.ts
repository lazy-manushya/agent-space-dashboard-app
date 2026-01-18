"use client";
import useSWR from "swr";
import { IBoeHeader } from "@/types/data";
import {
  IUseBoeHeadersParams,
  IUseBoeHeadersReturn,
} from "./useBoeHeaders.type";

type BoeHeadersResponse = {
  data: IBoeHeader[];
  total: number;
  page: number;
  limit: number;
};

async function fetcher(url: string): Promise<BoeHeadersResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
}

export function useBoeHeaders(
  params: IUseBoeHeadersParams = {},
): IUseBoeHeadersReturn {
  const buildQueryString = (params: IUseBoeHeadersParams) => {
    const queryParams = new URLSearchParams();
    const page = params.page || 1;
    const limit = params.limit || 25;

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    if (params.search) {
      queryParams.append("search", params.search);
    }

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    return queryParams.toString();
  };

  const queryString = buildQueryString(params);
  const apiUrl = `/api/boe-headers?${queryString}`;

  const { data, isLoading, error, mutate } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000,
  });

  // Derived state
  const headers = data?.data || [];
  const total = data?.total || 0;
  const page = data?.page || params.page || 1;
  const limit = data?.limit || params.limit || 25;
  const isUpdating = isLoading && !!data;
  const noData = !isLoading && (!data || !headers.length);

  return {
    data: headers,
    total,
    page,
    limit,
    loading: isLoading,
    updating: isUpdating,
    error: error?.message || null,
    noData,
    mutate,
  };
}
