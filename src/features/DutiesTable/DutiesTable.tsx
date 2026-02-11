import React, { useState } from "react";
import Table, { Column } from "@/components/Table";
import { IBoeDuty } from "@/types/data";
import styles from "./DutiesTable.module.css";

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

const formatPercentage = (value: number | undefined): string => {
  if (value === undefined || value === null) return "-";
  return `${value.toFixed(2)}%`;
};

// Dummy data generator for duties
const generateDummyDuties = (): IBoeDuty[] => {
  const duties: IBoeDuty[] = [];
  const beNos = [
    "BE2024001",
    "BE2024002",
    "BE2024003",
    "BE2024004",
    "BE2024005",
    "BE2024006",
    "BE2024007",
    "BE2024008",
    "BE2024009",
    "BE2024010",
  ];

  beNos.forEach((beNo, idx) => {
    duties.push({
      duty_id: idx + 1,
      be_no: beNo,
      bcd_pct: Math.random() * 20,
      bcd_amount: Math.random() * 50000 + 10000,
      bcd_duty_fg: Math.random() > 0.5 ? "Y" : "N",
      bcd_notn_no: `BCN${Math.floor(Math.random() * 1000)}`,
      bcd_notn_sno: `${Math.floor(Math.random() * 100)}`,
      h_cess_pct: Math.random() * 5,
      h_cess_amount: Math.random() * 5000 + 500,
      sws_pct: Math.random() * 10,
      sws_amount: Math.random() * 10000 + 1000,
      igst_pct: Math.random() * 18 + 12,
      igst_amount: Math.random() * 100000 + 20000,
      igst_notn_no: `IGN${Math.floor(Math.random() * 1000)}`,
      igst_notn_sno: `${Math.floor(Math.random() * 100)}`,
      mat_assess_value: Math.random() * 500000 + 100000,
      mat_duty: Math.random() * 100000 + 20000,
    });
  });

  return duties;
};

const DutiesTable = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [duties] = useState<IBoeDuty[]>(generateDummyDuties());

  const toggleRowExpansion = (dutyId: number) => {
    setExpandedRow(expandedRow === dutyId ? null : dutyId);
  };

  const COLUMNS: Column<IBoeDuty>[] = [
    {
      id: "duty_id",
      header: "Duty ID",
      accessor: "duty_id",
      size: 120,
      minSize: 120,
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
            <span className={`${styles.DutyId} ${styles.PrimaryData}`}>
              {value}
            </span>
          </div>
        );
      },
    },
    {
      id: "be_no",
      header: "BE No",
      accessor: "be_no",
      size: 140,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.PrimaryData}>{getValue()}</span>
      ),
    },
    {
      id: "bcd_pct",
      header: "BCD %",
      accessor: "bcd_pct",
      size: 100,
      minSize: 100,
      cell: ({ getValue }) => (
        <span className={styles.Percentage}>
          {formatPercentage(getValue())}
        </span>
      ),
    },
    {
      id: "bcd_amount",
      header: "BCD Amount",
      accessor: "bcd_amount",
      size: 130,
      minSize: 130,
      cell: ({ getValue }) => (
        <span className={styles.Amount}>₹{formatNumber(getValue())}</span>
      ),
    },
    {
      id: "igst_pct",
      header: "IGST %",
      accessor: "igst_pct",
      size: 100,
      minSize: 100,
      cell: ({ getValue }) => (
        <span className={styles.Percentage}>
          {formatPercentage(getValue())}
        </span>
      ),
    },
    {
      id: "igst_amount",
      header: "IGST Amount",
      accessor: "igst_amount",
      size: 140,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.Amount}>₹{formatNumber(getValue())}</span>
      ),
    },
    {
      id: "mat_assess_value",
      header: "Assessment Value",
      accessor: "mat_assess_value",
      size: 160,
      minSize: 160,
      cell: ({ getValue }) => (
        <span className={styles.Amount}>₹{formatNumber(getValue())}</span>
      ),
    },
    {
      id: "mat_duty",
      header: "Total Duty",
      accessor: "mat_duty",
      size: 140,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.Amount}>₹{formatNumber(getValue())}</span>
      ),
    },
  ];

  const renderExpandedRow = (duty: IBoeDuty) => (
    <tr className={styles.DetailRow}>
      <td colSpan={COLUMNS.length}>
        <div className={styles.DetailContent}>
          <div className={styles.DetailGrid}>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>BCD Duty Flag</div>
              <div className={styles.DetailValue}>{duty.bcd_duty_fg || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>BCD Notification No</div>
              <div className={styles.DetailValue}>{duty.bcd_notn_no || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>BCD Notification SNo</div>
              <div className={styles.DetailValue}>{duty.bcd_notn_sno || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>Health Cess %</div>
              <div className={styles.DetailValue}>
                {formatPercentage(duty.h_cess_pct)}
              </div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>Health Cess Amount</div>
              <div className={styles.DetailValue}>
                ₹{formatNumber(duty.h_cess_amount)}
              </div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>SWS %</div>
              <div className={styles.DetailValue}>
                {formatPercentage(duty.sws_pct)}
              </div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>SWS Amount</div>
              <div className={styles.DetailValue}>
                ₹{formatNumber(duty.sws_amount)}
              </div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>IGST Notification No</div>
              <div className={styles.DetailValue}>{duty.igst_notn_no || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>IGST Notification SNo</div>
              <div className={styles.DetailValue}>{duty.igst_notn_sno || "-"}</div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className={styles.Container}>
      <Table
        data={duties}
        columns={COLUMNS}
        enableRowSelection={false}
        enableSorting={true}
        enableColumnResizing={true}
        stickyHeader={true}
        renderExpandedRow={renderExpandedRow}
        expandedRows={expandedRow ? [expandedRow] : []}
        getRowId={(row) => row.duty_id}
      />
    </div>
  );
};

export default DutiesTable;
