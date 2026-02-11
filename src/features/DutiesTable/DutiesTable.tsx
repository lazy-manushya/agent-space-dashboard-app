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

// Static dummy data for duties (avoiding Math.random for SSR hydration)
const DUMMY_DUTIES: IBoeDuty[] = [
  {
    duty_id: 1,
    be_no: "BE2024001",
    hs_code: "8471.30.00",
    bcd_pct: 10.5,
    bcd_amount: 35000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN123",
    bcd_notn_sno: "45",
    h_cess_pct: 2.5,
    h_cess_amount: 2500,
    sws_pct: 5.0,
    sws_amount: 5500,
    igst_pct: 18.0,
    igst_amount: 65000,
    igst_notn_no: "IGN456",
    igst_notn_sno: "78",
    mat_assess_value: 350000,
    mat_duty: 45000,
  },
  {
    duty_id: 2,
    be_no: "BE2024002",
    hs_code: "8517.12.00",
    bcd_pct: 15.0,
    bcd_amount: 42000,
    bcd_duty_fg: "N",
    bcd_notn_no: "BCN234",
    bcd_notn_sno: "56",
    h_cess_pct: 3.0,
    h_cess_amount: 3000,
    sws_pct: 6.5,
    sws_amount: 6800,
    igst_pct: 12.0,
    igst_amount: 55000,
    igst_notn_no: "IGN567",
    igst_notn_sno: "89",
    mat_assess_value: 420000,
    mat_duty: 52000,
  },
  {
    duty_id: 3,
    be_no: "BE2024003",
    hs_code: "9403.60.00",
    bcd_pct: 8.5,
    bcd_amount: 28000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN345",
    bcd_notn_sno: "67",
    h_cess_pct: 1.5,
    h_cess_amount: 1800,
    sws_pct: 4.0,
    sws_amount: 4200,
    igst_pct: 28.0,
    igst_amount: 95000,
    igst_notn_no: "IGN678",
    igst_notn_sno: "90",
    mat_assess_value: 280000,
    mat_duty: 38000,
  },
  {
    duty_id: 4,
    be_no: "BE2024004",
    hs_code: "6204.62.00",
    bcd_pct: 12.0,
    bcd_amount: 38000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN456",
    bcd_notn_sno: "78",
    h_cess_pct: 2.0,
    h_cess_amount: 2200,
    sws_pct: 5.5,
    sws_amount: 5900,
    igst_pct: 18.0,
    igst_amount: 72000,
    igst_notn_no: "IGN789",
    igst_notn_sno: "12",
    mat_assess_value: 380000,
    mat_duty: 48000,
  },
  {
    duty_id: 5,
    be_no: "BE2024005",
    hs_code: "7326.90.99",
    bcd_pct: 18.0,
    bcd_amount: 55000,
    bcd_duty_fg: "N",
    bcd_notn_no: "BCN567",
    bcd_notn_sno: "89",
    h_cess_pct: 4.0,
    h_cess_amount: 4500,
    sws_pct: 8.0,
    sws_amount: 8500,
    igst_pct: 12.0,
    igst_amount: 48000,
    igst_notn_no: "IGN890",
    igst_notn_sno: "23",
    mat_assess_value: 550000,
    mat_duty: 68000,
  },
  {
    duty_id: 6,
    be_no: "BE2024006",
    hs_code: "3926.90.99",
    bcd_pct: 14.5,
    bcd_amount: 45000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN678",
    bcd_notn_sno: "90",
    h_cess_pct: 3.5,
    h_cess_amount: 3800,
    sws_pct: 7.0,
    sws_amount: 7200,
    igst_pct: 18.0,
    igst_amount: 78000,
    igst_notn_no: "IGN901",
    igst_notn_sno: "34",
    mat_assess_value: 450000,
    mat_duty: 58000,
  },
  {
    duty_id: 7,
    be_no: "BE2024007",
    hs_code: "8528.72.00",
    bcd_pct: 11.0,
    bcd_amount: 36000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN789",
    bcd_notn_sno: "12",
    h_cess_pct: 2.8,
    h_cess_amount: 3100,
    sws_pct: 6.0,
    sws_amount: 6500,
    igst_pct: 28.0,
    igst_amount: 105000,
    igst_notn_no: "IGN012",
    igst_notn_sno: "45",
    mat_assess_value: 360000,
    mat_duty: 46000,
  },
  {
    duty_id: 8,
    be_no: "BE2024008",
    hs_code: "6109.10.00",
    bcd_pct: 16.0,
    bcd_amount: 48000,
    bcd_duty_fg: "N",
    bcd_notn_no: "BCN890",
    bcd_notn_sno: "23",
    h_cess_pct: 3.2,
    h_cess_amount: 3500,
    sws_pct: 7.5,
    sws_amount: 7800,
    igst_pct: 12.0,
    igst_amount: 52000,
    igst_notn_no: "IGN123",
    igst_notn_sno: "56",
    mat_assess_value: 480000,
    mat_duty: 62000,
  },
  {
    duty_id: 9,
    be_no: "BE2024009",
    hs_code: "8443.32.10",
    bcd_pct: 13.5,
    bcd_amount: 41000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN901",
    bcd_notn_sno: "34",
    h_cess_pct: 2.3,
    h_cess_amount: 2700,
    sws_pct: 5.8,
    sws_amount: 6100,
    igst_pct: 18.0,
    igst_amount: 69000,
    igst_notn_no: "IGN234",
    igst_notn_sno: "67",
    mat_assess_value: 410000,
    mat_duty: 53000,
  },
  {
    duty_id: 10,
    be_no: "BE2024010",
    hs_code: "4202.92.00",
    bcd_pct: 9.5,
    bcd_amount: 32000,
    bcd_duty_fg: "Y",
    bcd_notn_no: "BCN012",
    bcd_notn_sno: "45",
    h_cess_pct: 1.8,
    h_cess_amount: 2100,
    sws_pct: 4.5,
    sws_amount: 4800,
    igst_pct: 28.0,
    igst_amount: 88000,
    igst_notn_no: "IGN345",
    igst_notn_sno: "78",
    mat_assess_value: 320000,
    mat_duty: 42000,
  },
];

const DutiesTable = () => {
  const [duties] = useState<IBoeDuty[]>(DUMMY_DUTIES);

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
