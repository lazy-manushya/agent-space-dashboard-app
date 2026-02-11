import React, { useState } from "react";
import Table, { Column } from "@/components/Table";
import { IBoeInvoice, IInvoiceItem } from "@/types/data";
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

// Dummy data generator for invoices
const generateDummyInvoices = (): IBoeInvoice[] => {
  const invoices: IBoeInvoice[] = [];
  const suppliers = [
    "ABC Trading Co.",
    "Global Imports Ltd.",
    "XYZ Corporation",
    "Sunrise Exports",
    "Tech Solutions Inc.",
  ];
  const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];
  const beNos = ["BE2024001", "BE2024002", "BE2024003", "BE2024004", "BE2024005"];

  for (let i = 1; i <= 10; i++) {
    const items: IInvoiceItem[] = [];
    const numItems = Math.floor(Math.random() * 3) + 1;

    for (let j = 1; j <= numItems; j++) {
      items.push({
        mat_sr_no: j,
        cth: `${Math.floor(Math.random() * 9000) + 1000}`,
        description: `Material Item ${j}`,
        unit_price: Math.random() * 1000 + 100,
        quantity: Math.floor(Math.random() * 100) + 10,
        uqc: "PCS",
        mat_amount: Math.random() * 50000 + 5000,
        reltd: Math.random() > 0.5 ? "Y" : "N",
        svb_ch: Math.random() > 0.7 ? "Y" : "N",
      });
    }

    invoices.push({
      invoice_item_id: i,
      be_no: beNos[Math.floor(Math.random() * beNos.length)],
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      invoice_sno: i,
      invoice_no: `INV${2024}${String(i).padStart(4, "0")}`,
      invoice_dt: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      invoice_amount: Math.random() * 500000 + 50000,
      invoice_currency: currencies[Math.floor(Math.random() * currencies.length)],
      misc_charges: Math.random() * 5000,
      inco_term: ["FOB", "CIF", "CFR", "EXW"][Math.floor(Math.random() * 4)],
      freight: Math.random() * 10000,
      freight_currency: currencies[Math.floor(Math.random() * currencies.length)],
      insurance: Math.random() * 5000,
      inv_ass_value: Math.random() * 600000 + 60000,
      items,
    });
  }

  return invoices;
};

const InvoicesTable = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [invoices] = useState<IBoeInvoice[]>(generateDummyInvoices());

  const toggleRowExpansion = (invoiceId: number) => {
    setExpandedRow(expandedRow === invoiceId ? null : invoiceId);
  };

  const COLUMNS: Column<IBoeInvoice>[] = [
    {
      id: "invoice_item_id",
      header: "Invoice ID",
      accessor: "invoice_item_id",
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
            <span className={`${styles.InvoiceId} ${styles.PrimaryData}`}>
              {value}
            </span>
          </div>
        );
      },
    },
    {
      id: "invoice_no",
      header: "Invoice No",
      accessor: "invoice_no",
      size: 140,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.PrimaryData}>{getValue() || "-"}</span>
      ),
    },
    {
      id: "supplier",
      header: "Supplier",
      accessor: "supplier",
      size: 200,
      minSize: 180,
      cell: ({ getValue }) => (
        <span className={styles.PrimaryData}>{getValue() || "-"}</span>
      ),
    },
    {
      id: "invoice_dt",
      header: "Invoice Date",
      accessor: "invoice_dt",
      size: 120,
      minSize: 120,
      cell: ({ getValue }) => (
        <span className={styles.MetaInfo}>{formatDate(getValue())}</span>
      ),
    },
    {
      id: "invoice_amount",
      header: "Invoice Amount",
      accessor: "invoice_amount",
      size: 150,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.Amount}>{formatNumber(getValue())}</span>
      ),
    },
    {
      id: "invoice_currency",
      header: "Currency",
      accessor: "invoice_currency",
      size: 100,
      minSize: 90,
      cell: ({ getValue }) => (
        <span className={styles.Currency}>{getValue() || "-"}</span>
      ),
    },
    {
      id: "inv_ass_value",
      header: "Assessment Value",
      accessor: "inv_ass_value",
      size: 160,
      minSize: 140,
      cell: ({ getValue }) => (
        <span className={styles.Amount}>{formatNumber(getValue())}</span>
      ),
    },
  ];

  const renderExpandedRow = (invoice: IBoeInvoice) => (
    <tr className={styles.DetailRow}>
      <td colSpan={COLUMNS.length}>
        <div className={styles.DetailContent}>
          <div className={styles.DetailGrid}>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>BE No</div>
              <div className={styles.DetailValue}>{invoice.be_no || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>Invoice SNo</div>
              <div className={styles.DetailValue}>{invoice.invoice_sno || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>INCO Term</div>
              <div className={styles.DetailValue}>{invoice.inco_term || "-"}</div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>Freight</div>
              <div className={styles.DetailValue}>
                {formatNumber(invoice.freight)} {invoice.freight_currency}
              </div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>Insurance</div>
              <div className={styles.DetailValue}>
                {formatNumber(invoice.insurance)}
              </div>
            </div>
            <div className={styles.DetailItem}>
              <div className={styles.DetailLabel}>Misc Charges</div>
              <div className={styles.DetailValue}>
                {formatNumber(invoice.misc_charges)}
              </div>
            </div>
          </div>

          {invoice.items && invoice.items.length > 0 && (
            <div className={styles.Section}>
              <div className={styles.SectionTitle}>Invoice Items</div>
              <table className={styles.ItemsTable}>
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>CTH</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.mat_sr_no}</td>
                      <td>{item.cth || "-"}</td>
                      <td>{item.description || "-"}</td>
                      <td>
                        {item.quantity} {item.uqc}
                      </td>
                      <td>{formatNumber(item.unit_price)}</td>
                      <td>{formatNumber(item.mat_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className={styles.Container}>
      <Table
        data={invoices}
        columns={COLUMNS}
        enableRowSelection={false}
        enableSorting={true}
        enableColumnResizing={true}
        stickyHeader={true}
        renderExpandedRow={renderExpandedRow}
        expandedRows={expandedRow ? [expandedRow] : []}
        getRowId={(row) => row.invoice_item_id}
      />
    </div>
  );
};

export default InvoicesTable;
