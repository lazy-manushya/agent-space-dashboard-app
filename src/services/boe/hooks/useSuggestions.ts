"use client";
import useSWR from "swr";

export interface ISuggestionItem {
  id: string | number;
  name: string;
}

export interface ISuggestionsResponse {
  boe_header: ISuggestionItem[];
  invoices: ISuggestionItem[];
  duties: ISuggestionItem[];
  licences: ISuggestionItem[];
  summaries: ISuggestionItem[];
}

export function useSuggestions(query: string, limit: number = 5) {
  const shouldFetch = query.trim().length > 0;
  const encodedQuery = encodeURIComponent(query.trim());
  const url = shouldFetch
    ? `/api/suggestions?q=${encodedQuery}&limit=${limit}`
    : null;

  const { data, isLoading, error } = useSWR<ISuggestionsResponse>(
    url,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch suggestions: ${response.status}`);
      }
      return response.json();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000,
    },
  );

  const suggestions = data || {
    boe_header: [],
    invoices: [],
    duties: [],
    licences: [],
    summaries: [],
  };

  const hasSuggestions =
    suggestions.boe_header.length > 0 ||
    suggestions.invoices.length > 0 ||
    suggestions.duties.length > 0 ||
    suggestions.licences.length > 0 ||
    suggestions.summaries.length > 0;

  return {
    suggestions,
    loading: isLoading && shouldFetch,
    error: error?.message || null,
    hasSuggestions,
  };
}
