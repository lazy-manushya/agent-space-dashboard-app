import React, { useState } from "react";
import Table, { Column } from "@/components/Table";
import { IBoeInvoice, IInvoiceItem, IBoeDuty } from "@/types/data";
import styles from "./InvoicesTable.module.css";

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

const formatDate = (date: string | undefined): string => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

// Static dummy data for invoices
const DUMMY_INVOICES: IBoeInvoice[] = [
  {
    invoice_item_id: 1,
    be_no: "BE2024001",
    supplier: "ABC Trading Co.",
    invoice_sno: 1,
    invoice_no: "INV20240001",
    invoice_dt: "2024-01-15",
    invoice_amount: 125000.50,
    invoice_currency: "USD",
    misc_charges: 1250.00,
    inco_term: "FOB",
    freight: 3500.00,
    freight_currency: "USD",
    insurance: 1800.00,
    inv_ass_value: 131550.50,
    importer_name: "Global Imports Ltd.",
    risk_indicator: "Low",
    port_code: "JNPT",
    status: "Cleared",
    items: [
      {
        mat_sr_no: 1,
        cth: "8471",
        description: "Material Item 1",
        unit_price: 450.00,
        quantity: 50,
        uqc: "PCS",
        mat_amount: 22500.00,
        reltd: "N",
        svb_ch: "N",
      },
      {
        mat_sr_no: 2,
        cth: "8473",
        description: "Material Item 2",
        unit_price: 680.50,
        quantity: 75,
        uqc: "PCS",
        mat_amount: 51037.50,
        reltd: "Y",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024001",
        hs_code: "8471",
        bcd_pct: 10,
        bcd_amount: 2250.00,
        igst_pct: 18,
        igst_amount: 4050.00,
        mat_assess_value: 22500.00,
        mat_duty: 6300.00,
      },
      {
        duty_id: 2,
        be_no: "BE2024001",
        hs_code: "8473",
        bcd_pct: 7.5,
        bcd_amount: 3827.81,
        igst_pct: 18,
        igst_amount: 9186.75,
        mat_assess_value: 51037.50,
        mat_duty: 13014.56,
      },
    ],
  },
  {
    invoice_item_id: 2,
    be_no: "BE2024002",
    supplier: "Global Imports Ltd.",
    invoice_sno: 2,
    invoice_no: "INV20240002",
    invoice_dt: "2024-02-10",
    invoice_amount: 285000.00,
    invoice_currency: "EUR",
    misc_charges: 2100.00,
    inco_term: "CIF",
    freight: 5200.00,
    freight_currency: "EUR",
    insurance: 3100.00,
    inv_ass_value: 295400.00,
    importer_name: "XYZ Corporation",
    risk_indicator: "Medium",
    port_code: "FSPL",
    status: "In Progress",
    items: [
      {
        mat_sr_no: 1,
        cth: "7326",
        description: "Material Item 1",
        unit_price: 950.00,
        quantity: 100,
        uqc: "PCS",
        mat_amount: 95000.00,
        reltd: "Y",
        svb_ch: "Y",
      },
      {
        mat_sr_no: 2,
        cth: "7308",
        description: "Material Item 2",
        unit_price: 1200.00,
        quantity: 80,
        uqc: "PCS",
        mat_amount: 96000.00,
        reltd: "N",
        svb_ch: "N",
      },
      {
        mat_sr_no: 3,
        cth: "7315",
        description: "Material Item 3",
        unit_price: 850.00,
        quantity: 60,
        uqc: "PCS",
        mat_amount: 51000.00,
        reltd: "Y",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024002",
        hs_code: "7326",
        bcd_pct: 15,
        bcd_amount: 14250.00,
        igst_pct: 18,
        igst_amount: 17100.00,
        mat_assess_value: 95000.00,
        mat_duty: 31350.00,
      },
      {
        duty_id: 2,
        be_no: "BE2024002",
        hs_code: "7308",
        bcd_pct: 10,
        bcd_amount: 9600.00,
        igst_pct: 12,
        igst_amount: 11520.00,
        mat_assess_value: 96000.00,
        mat_duty: 21120.00,
      },
      {
        duty_id: 3,
        be_no: "BE2024002",
        hs_code: "7315",
        bcd_pct: 7.5,
        bcd_amount: 3825.00,
        igst_pct: 18,
        igst_amount: 9180.00,
        mat_assess_value: 51000.00,
        mat_duty: 13005.00,
      },
    ],
  },
  {
    invoice_item_id: 3,
    be_no: "BE2024003",
    supplier: "XYZ Corporation",
    invoice_sno: 3,
    invoice_no: "INV20240003",
    invoice_dt: "2024-03-22",
    invoice_amount: 175000.75,
    invoice_currency: "USD",
    misc_charges: 1750.00,
    inco_term: "CFR",
    freight: 4100.00,
    freight_currency: "USD",
    insurance: 2200.00,
    inv_ass_value: 183050.75,
    importer_name: "Sunrise Exports",
    risk_indicator: "High",
    port_code: "ICCT",
    status: "Pending",
    items: [
      {
        mat_sr_no: 1,
        cth: "3926",
        description: "Material Item 1",
        unit_price: 325.50,
        quantity: 200,
        uqc: "PCS",
        mat_amount: 65100.00,
        reltd: "N",
        svb_ch: "Y",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024003",
        hs_code: "3926",
        bcd_pct: 10,
        bcd_amount: 6510.00,
        igst_pct: 18,
        igst_amount: 11718.00,
        mat_assess_value: 65100.00,
        mat_duty: 18228.00,
      },
    ],
  },
  {
    invoice_item_id: 4,
    be_no: "BE2024004",
    supplier: "Sunrise Exports",
    invoice_sno: 4,
    invoice_no: "INV20240004",
    invoice_dt: "2024-04-18",
    invoice_amount: 420000.00,
    invoice_currency: "GBP",
    misc_charges: 3500.00,
    inco_term: "EXW",
    freight: 6800.00,
    freight_currency: "GBP",
    insurance: 4200.00,
    inv_ass_value: 434500.00,
    importer_name: "Tech Solutions Inc.",
    risk_indicator: "Low",
    port_code: "NSICT",
    status: "Approved",
    items: [
      {
        mat_sr_no: 1,
        cth: "8542",
        description: "Material Item 1",
        unit_price: 1500.00,
        quantity: 120,
        uqc: "PCS",
        mat_amount: 180000.00,
        reltd: "Y",
        svb_ch: "N",
      },
      {
        mat_sr_no: 2,
        cth: "8544",
        description: "Material Item 2",
        unit_price: 750.00,
        quantity: 150,
        uqc: "PCS",
        mat_amount: 112500.00,
        reltd: "N",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024004",
        hs_code: "8542",
        bcd_pct: 0,
        bcd_amount: 0.00,
        igst_pct: 18,
        igst_amount: 32400.00,
        mat_assess_value: 180000.00,
        mat_duty: 32400.00,
      },
      {
        duty_id: 2,
        be_no: "BE2024004",
        hs_code: "8544",
        bcd_pct: 5,
        bcd_amount: 5625.00,
        igst_pct: 18,
        igst_amount: 20250.00,
        mat_assess_value: 112500.00,
        mat_duty: 25875.00,
      },
    ],
  },
  {
    invoice_item_id: 5,
    be_no: "BE2024005",
    supplier: "Tech Solutions Inc.",
    invoice_sno: 5,
    invoice_no: "INV20240005",
    invoice_dt: "2024-05-12",
    invoice_amount: 195000.25,
    invoice_currency: "USD",
    misc_charges: 1850.00,
    inco_term: "FOB",
    freight: 4500.00,
    freight_currency: "USD",
    insurance: 2400.00,
    inv_ass_value: 203750.25,
    importer_name: "ABC Trading Co.",
    risk_indicator: "Medium",
    port_code: "IICCT",
    status: "Cleared",
    items: [
      {
        mat_sr_no: 1,
        cth: "9018",
        description: "Material Item 1",
        unit_price: 550.00,
        quantity: 90,
        uqc: "PCS",
        mat_amount: 49500.00,
        reltd: "N",
        svb_ch: "N",
      },
      {
        mat_sr_no: 2,
        cth: "9027",
        description: "Material Item 2",
        unit_price: 820.00,
        quantity: 70,
        uqc: "PCS",
        mat_amount: 57400.00,
        reltd: "Y",
        svb_ch: "Y",
      },
      {
        mat_sr_no: 3,
        cth: "9030",
        description: "Material Item 3",
        unit_price: 450.00,
        quantity: 55,
        uqc: "PCS",
        mat_amount: 24750.00,
        reltd: "N",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024005",
        hs_code: "9018",
        bcd_pct: 0,
        bcd_amount: 0.00,
        igst_pct: 12,
        igst_amount: 5940.00,
        mat_assess_value: 49500.00,
        mat_duty: 5940.00,
      },
      {
        duty_id: 2,
        be_no: "BE2024005",
        hs_code: "9027",
        bcd_pct: 7.5,
        bcd_amount: 4305.00,
        igst_pct: 18,
        igst_amount: 10332.00,
        mat_assess_value: 57400.00,
        mat_duty: 14637.00,
      },
      {
        duty_id: 3,
        be_no: "BE2024005",
        hs_code: "9030",
        bcd_pct: 5,
        bcd_amount: 1237.50,
        igst_pct: 18,
        igst_amount: 4455.00,
        mat_assess_value: 24750.00,
        mat_duty: 5692.50,
      },
    ],
  },
  {
    invoice_item_id: 6,
    be_no: "BE2024001",
    supplier: "ABC Trading Co.",
    invoice_sno: 6,
    invoice_no: "INV20240006",
    invoice_dt: "2024-06-08",
    invoice_amount: 310000.00,
    invoice_currency: "EUR",
    misc_charges: 2800.00,
    inco_term: "CIF",
    freight: 5800.00,
    freight_currency: "EUR",
    insurance: 3500.00,
    inv_ass_value: 322100.00,
    importer_name: "Global Imports Ltd.",
    risk_indicator: "Low",
    port_code: "JNPT",
    status: "Rejected",
    items: [
      {
        mat_sr_no: 1,
        cth: "8517",
        description: "Material Item 1",
        unit_price: 1100.00,
        quantity: 110,
        uqc: "PCS",
        mat_amount: 121000.00,
        reltd: "Y",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024001",
        hs_code: "8517",
        bcd_pct: 10,
        bcd_amount: 12100.00,
        igst_pct: 18,
        igst_amount: 21780.00,
        mat_assess_value: 121000.00,
        mat_duty: 33880.00,
      },
    ],
  },
  {
    invoice_item_id: 7,
    be_no: "BE2024002",
    supplier: "Global Imports Ltd.",
    invoice_sno: 7,
    invoice_no: "INV20240007",
    invoice_dt: "2024-07-25",
    invoice_amount: 265000.50,
    invoice_currency: "USD",
    misc_charges: 2350.00,
    inco_term: "FOB",
    freight: 5100.00,
    freight_currency: "USD",
    insurance: 2900.00,
    inv_ass_value: 275350.50,
    importer_name: "XYZ Corporation",
    risk_indicator: "High",
    port_code: "FSPL",
    status: "Pending",
    items: [
      {
        mat_sr_no: 1,
        cth: "6109",
        description: "Material Item 1",
        unit_price: 280.00,
        quantity: 250,
        uqc: "PCS",
        mat_amount: 70000.00,
        reltd: "N",
        svb_ch: "N",
      },
      {
        mat_sr_no: 2,
        cth: "6110",
        description: "Material Item 2",
        unit_price: 320.00,
        quantity: 200,
        uqc: "PCS",
        mat_amount: 64000.00,
        reltd: "Y",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024002",
        hs_code: "6109",
        bcd_pct: 10,
        bcd_amount: 7000.00,
        igst_pct: 12,
        igst_amount: 8400.00,
        mat_assess_value: 70000.00,
        mat_duty: 15400.00,
      },
      {
        duty_id: 2,
        be_no: "BE2024002",
        hs_code: "6110",
        bcd_pct: 10,
        bcd_amount: 6400.00,
        igst_pct: 12,
        igst_amount: 7680.00,
        mat_assess_value: 64000.00,
        mat_duty: 14080.00,
      },
    ],
  },
  {
    invoice_item_id: 8,
    be_no: "BE2024003",
    supplier: "XYZ Corporation",
    invoice_sno: 8,
    invoice_no: "INV20240008",
    invoice_dt: "2024-08-14",
    invoice_amount: 380000.00,
    invoice_currency: "JPY",
    misc_charges: 3200.00,
    inco_term: "CFR",
    freight: 6200.00,
    freight_currency: "JPY",
    insurance: 3800.00,
    inv_ass_value: 393200.00,
    importer_name: "Sunrise Exports",
    risk_indicator: "Medium",
    port_code: "ICCT",
    status: "In Progress",
    items: [
      {
        mat_sr_no: 1,
        cth: "8708",
        description: "Material Item 1",
        unit_price: 1250.00,
        quantity: 95,
        uqc: "PCS",
        mat_amount: 118750.00,
        reltd: "N",
        svb_ch: "Y",
      },
      {
        mat_sr_no: 2,
        cth: "8714",
        description: "Material Item 2",
        unit_price: 890.00,
        quantity: 85,
        uqc: "PCS",
        mat_amount: 75650.00,
        reltd: "Y",
        svb_ch: "N",
      },
      {
        mat_sr_no: 3,
        cth: "8716",
        description: "Material Item 3",
        unit_price: 650.00,
        quantity: 65,
        uqc: "PCS",
        mat_amount: 42250.00,
        reltd: "N",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024003",
        hs_code: "8708",
        bcd_pct: 15,
        bcd_amount: 17812.50,
        igst_pct: 28,
        igst_amount: 33250.00,
        mat_assess_value: 118750.00,
        mat_duty: 51062.50,
      },
      {
        duty_id: 2,
        be_no: "BE2024003",
        hs_code: "8714",
        bcd_pct: 10,
        bcd_amount: 7565.00,
        igst_pct: 18,
        igst_amount: 13617.00,
        mat_assess_value: 75650.00,
        mat_duty: 21182.00,
      },
      {
        duty_id: 3,
        be_no: "BE2024003",
        hs_code: "8716",
        bcd_pct: 10,
        bcd_amount: 4225.00,
        igst_pct: 18,
        igst_amount: 7605.00,
        mat_assess_value: 42250.00,
        mat_duty: 11830.00,
      },
    ],
  },
  {
    invoice_item_id: 9,
    be_no: "BE2024004",
    supplier: "Sunrise Exports",
    invoice_sno: 9,
    invoice_no: "INV20240009",
    invoice_dt: "2024-09-30",
    invoice_amount: 225000.75,
    invoice_currency: "USD",
    misc_charges: 2100.00,
    inco_term: "EXW",
    freight: 4800.00,
    freight_currency: "USD",
    insurance: 2600.00,
    inv_ass_value: 234500.75,
    importer_name: "Tech Solutions Inc.",
    risk_indicator: "Low",
    port_code: "NSICT",
    status: "Cleared",
    items: [
      {
        mat_sr_no: 1,
        cth: "8528",
        description: "Material Item 1",
        unit_price: 980.00,
        quantity: 78,
        uqc: "PCS",
        mat_amount: 76440.00,
        reltd: "Y",
        svb_ch: "N",
      },
      {
        mat_sr_no: 2,
        cth: "8529",
        description: "Material Item 2",
        unit_price: 560.00,
        quantity: 92,
        uqc: "PCS",
        mat_amount: 51520.00,
        reltd: "N",
        svb_ch: "Y",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024004",
        hs_code: "8528",
        bcd_pct: 10,
        bcd_amount: 7644.00,
        igst_pct: 18,
        igst_amount: 13759.20,
        mat_assess_value: 76440.00,
        mat_duty: 21403.20,
      },
      {
        duty_id: 2,
        be_no: "BE2024004",
        hs_code: "8529",
        bcd_pct: 10,
        bcd_amount: 5152.00,
        igst_pct: 18,
        igst_amount: 9273.60,
        mat_assess_value: 51520.00,
        mat_duty: 14425.60,
      },
    ],
  },
  {
    invoice_item_id: 10,
    be_no: "BE2024005",
    supplier: "Tech Solutions Inc.",
    invoice_sno: 10,
    invoice_no: "INV20240010",
    invoice_dt: "2024-10-20",
    invoice_amount: 155000.00,
    invoice_currency: "INR",
    misc_charges: 1500.00,
    inco_term: "FOB",
    freight: 3800.00,
    freight_currency: "INR",
    insurance: 2100.00,
    inv_ass_value: 162400.00,
    importer_name: "ABC Trading Co.",
    risk_indicator: "Medium",
    port_code: "IICCT",
    status: "Approved",
    items: [
      {
        mat_sr_no: 1,
        cth: "4011",
        description: "Material Item 1",
        unit_price: 720.00,
        quantity: 105,
        uqc: "PCS",
        mat_amount: 75600.00,
        reltd: "N",
        svb_ch: "N",
      },
    ],
    duties: [
      {
        duty_id: 1,
        be_no: "BE2024005",
        hs_code: "4011",
        bcd_pct: 10,
        bcd_amount: 7560.00,
        igst_pct: 28,
        igst_amount: 21168.00,
        mat_assess_value: 75600.00,
        mat_duty: 28728.00,
      },
    ],
  },
];

const InvoicesTable = () => {
  const [invoices] = useState<IBoeInvoice[]>(DUMMY_INVOICES);

  const COLUMNS: Column<IBoeInvoice>[] = [
    {
      id: "be_no",
      header: "BE NO",
      accessor: "be_no",
      size: 140,
      minSize: 140,
      fixed: true,
      cell: ({ getValue }) => {
        return (
          <span className={styles.BeNumber}>
            {getValue() || "-"}
          </span>
        );
      },
    },
    {
      id: "importer_name",
      header: "IMPORTER NAME",
      accessor: "importer_name",
      size: 200,
      minSize: 180,
      cell: ({ getValue }) => {
        const importer = getValue();
        return (
          <span className={styles.PrimaryData}>
            {importer || "-"}
          </span>
        );
      },
    },
    {
      id: "risk_indicator",
      header: "RISK INDICATOR",
      accessor: "risk_indicator",
      size: 140,
      minSize: 130,
      cell: ({ getValue }) => {
        const risk = getValue();
        const riskClass = risk === "High" ? styles.RiskHigh :
                         risk === "Medium" ? styles.RiskMedium :
                         styles.RiskLow;
        return (
          <span className={`${styles.RiskBadge} ${riskClass}`}>
            {risk || "-"}
          </span>
        );
      },
    },
    {
      id: "port_code",
      header: "PORT CODE",
      accessor: "port_code",
      size: 120,
      minSize: 110,
      cell: ({ getValue }) => {
        const port = getValue();
        return (
          <span className={styles.PrimaryData}>
            {port || "-"}
          </span>
        );
      },
    },
    {
      id: "status",
      header: "STATUS",
      accessor: "status",
      size: 130,
      minSize: 120,
      cell: ({ getValue }) => {
        const status = getValue();
        const statusClass = status === "Cleared" ? styles.StatusCleared :
                           status === "Approved" ? styles.StatusApproved :
                           status === "Rejected" ? styles.StatusRejected :
                           status === "Pending" ? styles.StatusPending :
                           styles.StatusInProgress;
        return (
          <span className={`${styles.StatusBadge} ${statusClass}`}>
            {status || "-"}
          </span>
        );
      },
    },
  ];

  return (
    <div className={styles.Container}>
      <Table
        data={invoices}
        columns={COLUMNS}
      />
    </div>
  );
};

export default InvoicesTable;
