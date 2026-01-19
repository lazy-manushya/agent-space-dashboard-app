"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import AutocompleteSearchField from "@/components/AutocompleteSearchField";
import { IBoeSearchPageProps } from "./BoeSearchPage.types";
import styles from "./BoeSearchPage.module.css";

// Mock BOE data with complete details
const MOCK_BOE_DATA = [
  {
    be_no: "1234567",
    year: "2024",
    iec_no: "IEC0000001",
    gst_no: "27AABCU9603R1ZM",
    port_code: "INNSA1",
    be_date: "2024-01-15",
    pkg: 150,
    g_wt: 2500.50,
    ex_rate: 83.25,
    no_of_invoices: 5,
    total_items: 42
  },
  {
    be_no: "2345678",
    year: "2024",
    iec_no: "IEC0000002",
    gst_no: "29BBCDE1234F2ZN",
    port_code: "INPRT2",
    be_date: "2024-02-20",
    pkg: 200,
    g_wt: 3200.75,
    ex_rate: 82.90,
    no_of_invoices: 8,
    total_items: 56
  },
  {
    be_no: "3456789",
    year: "2024",
    iec_no: "IEC0000003",
    gst_no: "33CDEFG5678H3ZO",
    port_code: "INMAA1",
    be_date: "2024-03-10",
    pkg: 100,
    g_wt: 1800.25,
    ex_rate: 83.50,
    no_of_invoices: 3,
    total_items: 28
  },
  {
    be_no: "4567890",
    year: "2023",
    iec_no: "IEC0000004",
    gst_no: "07DEFGH9012I4ZP",
    port_code: "INDEL6",
    be_date: "2023-12-05",
    pkg: 250,
    g_wt: 4100.00,
    ex_rate: 82.15,
    no_of_invoices: 10,
    total_items: 65
  },
  {
    be_no: "5678901",
    year: "2024",
    iec_no: "IEC0000005",
    gst_no: "29EFGHI3456J5ZQ",
    port_code: "INBLR4",
    be_date: "2024-01-25",
    pkg: 180,
    g_wt: 2900.60,
    ex_rate: 83.00,
    no_of_invoices: 6,
    total_items: 48
  },
  {
    be_no: "6789012",
    year: "2024",
    iec_no: "IEC0000006",
    gst_no: "21FGHIJ7890K6ZR",
    port_code: "INPRT2",
    be_date: "2024-04-12",
    pkg: 120,
    g_wt: 2100.40,
    ex_rate: 83.75,
    no_of_invoices: 4,
    total_items: 35
  },
  {
    be_no: "7890123",
    year: "2024",
    iec_no: "IEC0000007",
    gst_no: "27GHIJK1234L7ZS",
    port_code: "INNSA1",
    be_date: "2024-02-08",
    pkg: 300,
    g_wt: 5200.80,
    ex_rate: 82.80,
    no_of_invoices: 12,
    total_items: 78
  },
  {
    be_no: "8901234",
    year: "2023",
    iec_no: "IEC0000008",
    gst_no: "33HIJKL5678M8ZT",
    port_code: "INMAA1",
    be_date: "2023-11-30",
    pkg: 160,
    g_wt: 2700.30,
    ex_rate: 82.50,
    no_of_invoices: 7,
    total_items: 52
  },
];

// Transform for autocomplete display
const MOCK_SUGGESTIONS = MOCK_BOE_DATA.map(boe => ({
  id: boe.be_no,
  label: `${boe.be_no} - ${boe.year} - ${boe.port_code} - ${boe.iec_no} - ${boe.be_date}`
}));

// Export for use in detail page
export { MOCK_BOE_DATA };

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
