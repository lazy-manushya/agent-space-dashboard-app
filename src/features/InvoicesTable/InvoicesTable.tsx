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

// Dummy data generator for duties
const generateDummyDuties = (beNo: string, items: IInvoiceItem[]): IBoeDuty[] => {
  return items.map((item, index) => {
    const assessValue = item.mat_amount || 10000;
    const bcdPct = [0, 5, 7.5, 10, 15][Math.floor(Math.random() * 5)];
    const bcdAmount = (assessValue * bcdPct) / 100;
    const igstPct = [0, 5, 12, 18, 28][Math.floor(Math.random() * 5)];
    const igstAmount = (assessValue * igstPct) / 100;
    const totalDuty = bcdAmount + igstAmount;

    return {
      duty_id: index + 1,
      be_no: beNo,
      hs_code: item.cth,
      bcd_pct: bcdPct,
      bcd_amount: bcdAmount,
      igst_pct: igstPct,
      igst_amount: igstAmount,
      mat_assess_value: assessValue,
      mat_duty: totalDuty,
    };
  });
};

// Dummy data generator for invoices
const generateDummyInvoices = (): IBoeInvoice[] => {
  const invoices: IBoeInvoice[] = [];
  const importers = [
    "ABC Trading Co.",
    "Global Imports Ltd.",
    "XYZ Corporation",
    "Sunrise Exports",
    "Tech Solutions Inc.",
  ];
  const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];
  const beNos = ["BE2024001", "BE2024002", "BE2024003", "BE2024004", "BE2024005"];
  const riskIndicators = ["Low", "Medium", "High"];
  const portCodes = ["JNPT", "FSPL", "ICCT", "NSICT", "IICCT"];
  const statuses = ["Pending", "Cleared", "In Progress", "Approved", "Rejected"];

  for (let i = 1; i <= 10; i++) {
    const items: IInvoiceItem[] = [];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const beNo = beNos[Math.floor(Math.random() * beNos.length)];

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

    const duties = generateDummyDuties(beNo, items);

    invoices.push({
      invoice_item_id: i,
      be_no: beNo,
      supplier: importers[Math.floor(Math.random() * importers.length)],
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
      duties,
      // New fields
      importer_name: importers[Math.floor(Math.random() * importers.length)],
      risk_indicator: riskIndicators[Math.floor(Math.random() * riskIndicators.length)],
      port_code: portCodes[Math.floor(Math.random() * portCodes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
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
      id: "be_no",
      header: "BE NO",
      accessor: "be_no",
      size: 140,
      minSize: 140,
      fixed: true,
      cell: ({ getValue, row }) => {
        const invoiceItemId = (row.original as IBoeInvoice).invoice_item_id;
        const isExpanded = expandedRow === invoiceItemId;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={() => toggleRowExpansion(invoiceItemId)}
          >
            <span className={styles.ExpandIcon}>{isExpanded ? "▼" : "▶"}</span>
            <span className={styles.BeNumber}>
              {getValue() || "-"}
            </span>
          </div>
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

          {invoice.duties && invoice.duties.length > 0 && (
            <div className={styles.Section}>
              <div className={styles.SectionTitle}>Duties</div>
              <table className={styles.ItemsTable}>
                <thead>
                  <tr>
                    <th>BE NO</th>
                    <th>HS Code</th>
                    <th>Accessible Value</th>
                    <th>Total Duty</th>
                    <th>Duty %</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.duties.map((duty, idx) => {
                    const totalDutyPct = (duty.bcd_pct || 0) + (duty.igst_pct || 0) + (duty.h_cess_pct || 0) + (duty.sws_pct || 0);

                    return (
                      <tr key={idx}>
                        <td>{duty.be_no || "-"}</td>
                        <td>{duty.hs_code || "-"}</td>
                        <td>{formatNumber(duty.mat_assess_value)}</td>
                        <td>{formatNumber(duty.mat_duty)}</td>
                        <td>{totalDutyPct.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
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
