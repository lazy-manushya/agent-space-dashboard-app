import { useState, useEffect } from "react";
import { IMetadata } from "@/types/data";
import { IUseBoeHeadersMetadataReturn } from "./useBoeHeadersMetadata.type";

/**
 * Custom hook to fetch BOE headers metadata
 * Fetches unique years, port codes, and other metadata on mount
 *
 * Usage:
 * const { metadata, loading, error } = useBoeHeadersMetadata();
 */
export function useBoeHeadersMetadata(): IUseBoeHeadersMetadataReturn {
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/boe-headers/metadata");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: IMetadata = await response.json();
        setMetadata(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch metadata";
        setError(errorMessage);
        console.error("Error fetching metadata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return {
    metadata,
    loading,
    error,
  };
}
