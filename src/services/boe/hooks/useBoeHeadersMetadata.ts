import useSWR from "swr";
import { IMetadata } from "@/types/data";
import { IUseBoeHeadersMetadataReturn } from "./useBoeHeadersMetadata.type";

async function fetcher(url: string): Promise<IMetadata> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export function useBoeHeadersMetadata(): IUseBoeHeadersMetadataReturn {
  const {
    data: metadata,
    isLoading: loading,
    error,
  } = useSWR("/api/boe-headers/metadata", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    metadata: metadata || null,
    loading,
    error: error?.message || null,
  };
}
