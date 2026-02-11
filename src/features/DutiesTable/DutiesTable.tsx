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
  const hsCodes = [
    "8471.30.00",
    "8517.12.00",
    "9403.60.00",
    "6204.62.00",
    "7326.90.99",
    "3926.90.99",
    "8528.72.00",
    "6109.10.00",
    "8443.32.10",
    "4202.92.00",
  ];

  beNos.forEach((beNo, idx) => {
    const bcdPct = Math.random() * 20;
    const igstPct = Math.random() * 18 + 12;
    const hCessPct = Math.random() * 5;
    const swsPct = Math.random() * 10;

    duties.push({
      duty_id: idx + 1,
      be_no: beNo,
      hs_code: hsCodes[idx],
      bcd_pct: bcdPct,
      bcd_amount: Math.random() * 50000 + 10000,
      bcd_duty_fg: Math.random() > 0.5 ? "Y" : "N",
      bcd_notn_no: `BCN${Math.floor(Math.random() * 1000)}`,
      bcd_notn_sno: `${Math.floor(Math.random() * 100)}`,
      h_cess_pct: hCessPct,
      h_cess_amount: Math.random() * 5000 + 500,
      sws_pct: swsPct,
      sws_amount: Math.random() * 10000 + 1000,
      igst_pct: igstPct,
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
  const [duties] = useState<IBoeDuty[]>(generateDummyDuties());

  const COLUMNS: Column<IBoeDuty>[] = [
    {
      id: "be_no",
      header: "BE NO",
      accessor: "be_no",
      size: 140,
      minSize: 140,
      fixed: true,
      cell: ({ getValue }) => {
        return (
          <span className={styles.PrimaryData}>
            {getValue() || "-"}
          </span>
        );
      },
    },
    {
      id: "hs_code",
      header: "HS Code",
      accessor: "hs_code",
      size: 120,
      minSize: 120,
      cell: ({ getValue }) => (
        <span className={styles.PrimaryData}>{getValue() || "-"}</span>
      ),
    },
    {
      id: "mat_assess_value",
      header: "Accessible Value",
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
    {
      id: "duty_pct",
      header: "Duty %",
      accessor: (row) => {
        const bcdPct = row.bcd_pct || 0;
        const igstPct = row.igst_pct || 0;
        const hCessPct = row.h_cess_pct || 0;
        const swsPct = row.sws_pct || 0;
        const total = bcdPct + igstPct + hCessPct + swsPct;
        return total.toFixed(2);
      },
      size: 120,
      minSize: 120,
      cell: ({ getValue }) => (
        <span className={styles.Percentage}>
          {getValue()}%
        </span>
      ),
    },
  ];

  return (
    <div className={styles.Container}>
      <Table
        data={duties}
        columns={COLUMNS}
      />
    </div>
  );
};

export default DutiesTable;
