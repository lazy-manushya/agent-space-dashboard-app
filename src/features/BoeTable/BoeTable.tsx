import { useState } from "react";

import Table, { Column } from "@/components/Table";
import TableShimmer from "@/components/TableShimmer";
import Text from "@/components/Text";
import { useBoeHeaders } from "@/services/boe";
import Modal from "@/components/Modal";
import { IBoeHeader } from "@/types/data";
import BoeHeaderDisplay from "@/features/BoeHeaderDisplay";

import styles from "./BoeTable.module.css";
import { joinClassNames } from "@/utils/classNames";

// Number formatting utilities
const formatNumber = (
  value: number | undefined,
  maxDecimals: number = 2,
): string => {
  if (value === undefined || value === null) return "-";

  // For large numbers, use compact notation
  if (value >= 1000000) {
    return (value / 1000000).toFixed(maxDecimals) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(maxDecimals) + "k";
  }

  // For regular numbers, limit decimals
  return Number(value.toFixed(maxDecimals)).toLocaleString();
};

const formatDecimal = (
  value: number | undefined,
  maxDecimals: number = 2,
): string => {
  if (value === undefined || value === null) return "-";
  return Number(value.toFixed(maxDecimals)).toLocaleString();
};

const BoeTable = ({ className }: { className?: string }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRowExpansion = (beNo: string) => {
    setExpandedRow(expandedRow === beNo ? null : beNo);
  };

  const {
    data: boeHeaders,
    loading,
    error,
  } = useBoeHeaders({
    page: 1,
    limit: 100,
    // search: searchTerm || undefined,
    // filters: Object.keys(filters).length > 0 ? filters : undefined,
  });

  const COLUMNS: Column<IBoeHeader>[] = [
    {
      id: "be_no",
      header: "BE No",
      accessor: "be_no",
      size: 160,
      minSize: 160,
      fixed: true,
      cell: ({ getValue }) => {
        const value = getValue();
        const isExpanded = expandedRow === value;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={() => toggleRowExpansion(value)}
          >
            <span className={styles.ExpandIcon}>{isExpanded ? "▼" : "▶"}</span>
            <span className={`${styles.BeNumber} ${styles.PrimaryData}`}>
              {value}
            </span>
          </div>
        );
      },
    },
    {
      id: "year",
      header: "Year",
      accessor: "year",
      size: 90,
      minSize: 90,
      cell: ({ getValue }) => (
        <span className={styles.MetaInfo}>{getValue()}</span>
      ),
    },
    {
      id: "iec_no",
      header: "IEC No",
      accessor: "iec_no",
      size: 140,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.MetaInfo}>{getValue()}</span>
      ),
    },
    {
      id: "gst_no",
      header: "GST No",
      accessor: "gst_no",
      size: 150,
      minSize: 150,
      cell: ({ getValue }) => (
        <span className={styles.MetaInfo}>{getValue()}</span>
      ),
    },
    {
      id: "port_code",
      header: "Port Code",
      accessor: "port_code",
      size: 120,
      minSize: 120,
      cell: ({ getValue }) => {
        const portCode = getValue();
        return (
          <span
            className={`${styles.PortBadge} ${styles[portCode?.toLowerCase()]} ${styles.PrimaryData}`}
          >
            {portCode}
          </span>
        );
      },
    },
    {
      id: "be_date",
      header: "BE Date",
      accessor: "be_date",
      size: 130,
      minSize: 130,
      cell: ({ getValue }) => (
        <span className={styles.SecondaryData}>{getValue()}</span>
      ),
    },
    {
      id: "pkg",
      header: "Packages",
      accessor: "pkg",
      size: 120,
      minSize: 120,
      alignment: "right",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={styles.NumberCell}>
            <span className={styles.PrimaryData}>{formatNumber(value, 0)}</span>
          </div>
        );
      },
    },
    {
      id: "g_wt",
      header: "Gross Weight",
      accessor: "g_wt",
      size: 120,
      minSize: 120,
      // alignment: "right",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className={styles.PrimaryData}>{formatNumber(value, 2)}</span>
        );
      },
    },
    {
      id: "ex_rate",
      header: "Exchange Rate",
      accessor: "ex_rate",
      size: 110,
      minSize: 110,
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={styles.NumberCell}>
            <span className={styles.MetaInfo}>{formatDecimal(value, 2)}</span>
          </div>
        );
      },
    },
    {
      id: "no_of_invoices",
      header: "Invoices",
      accessor: "no_of_invoices",
      size: 110,
      minSize: 110,
      alignment: "right",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={styles.NumberCell}>
            <span className={styles.MetaInfo}>{formatNumber(value, 0)}</span>
          </div>
        );
      },
    },
    {
      id: "total_items",
      header: "Items",
      accessor: "total_items",
      size: 110,
      minSize: 110,
      alignment: "right",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={styles.NumberCell}>
            <span className={styles.MetaInfo}>{formatNumber(value, 0)}</span>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className={styles.SubContainer}>
        <TableShimmer rows={10} columns={11} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.SubContainer}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </div>
    );
  }

  return (
    <div className={joinClassNames(styles.SubContainer, className)}>
      {loading && <TableShimmer rows={10} columns={11} />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      {!loading && !error && boeHeaders.length > 0 && (
        <Table<IBoeHeader> columns={COLUMNS} data={boeHeaders} />
      )}

      <Modal
        isOpen={!!expandedRow}
        onOpenChange={() => setExpandedRow(null)}
        style={{ width: "480px", height: "auto" }}
      >
        {boeHeaders
          .filter((header) => header.be_no === expandedRow)
          .map((header) => (
            <BoeHeaderDisplay key={header.be_no} header={header} />
          ))}
      </Modal>
    </div>
  );
};

export default BoeTable;
