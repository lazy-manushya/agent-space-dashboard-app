"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import AutocompleteSearchField from "@/components/AutocompleteSearchField";
import { IBoeSearchPageProps } from "./BoeSearchPage.types";
import styles from "./BoeSearchPage.module.css";

// Mock data for autocomplete suggestions
const MOCK_SUGGESTIONS = [
  { id: "BE2024IN0001", label: "BE2024IN0001 - INNSA1 - IEC9000000001" },
  { id: "BE2024IN0002", label: "BE2024IN0002 - INPRT2 - IEC9000000002" },
  { id: "BE2024IN0003", label: "BE2024IN0003 - INMAA1 - IEC9000000003" },
  { id: "BE2024IN0004", label: "BE2024IN0004 - INDEL6 - IEC9000000004" },
  { id: "BE2024IN0005", label: "BE2024IN0005 - INBLR4 - IEC9000000005" },
  { id: "BE2024IN0006", label: "BE2024IN0006 - INPRT2 - IEC9000000006" },
  { id: "BE2024IN0007", label: "BE2024IN0007 - INNSA1 - IEC9000000007" },
  { id: "BE2024IN0008", label: "BE2024IN0008 - INMAA1 - IEC9000000008" },
];

function BoeSearchPage({ className }: IBoeSearchPageProps) {
  const router = useRouter();

  const handleSelectionChange = useCallback(
    (key: React.Key | null) => {
      if (key) {
        // Navigate to BOE detail page
        router.push(`/boe/${key}`);
      }
    },
    [router]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.SearchWrapper}>
        <h1 className={styles.Title}>BOE Search</h1>
        <p className={styles.Subtitle}>
          Search for Bill of Entry by BE Number, IEC Number, or Port Code
        </p>

        <AutocompleteSearchField
          items={MOCK_SUGGESTIONS}
          placeholder="Enter BE Number, IEC Number, or Port Code..."
          onSelectionChange={handleSelectionChange}
          aria-label="BOE Search Field"
          className={styles.SearchField}
        />
      </div>
    </div>
  );
}

export default BoeSearchPage;
