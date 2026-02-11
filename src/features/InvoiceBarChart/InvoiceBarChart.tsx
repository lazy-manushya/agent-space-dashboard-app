import React from "react";
import BarChart from "@/components/BarChart";
import { IInvoiceBarChartProps } from "./InvoiceBarChart.types";
import styles from "./InvoiceBarChart.module.css";

const DUMMY_INVOICE_DATA = [
  { label: "ABC Trading", value: 3250000, color: "#667eea" },
  { label: "Global Imports", value: 4180000, color: "#4facfe" },
  { label: "XYZ Corp", value: 2890000, color: "#43e97b" },
  { label: "Sunrise Exports", value: 5120000, color: "#fa709a" },
  { label: "Tech Solutions", value: 3760000, color: "#fee140" },
];

const InvoiceBarChart: React.FC<IInvoiceBarChartProps> = ({ className }) => {
  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <BarChart
        data={DUMMY_INVOICE_DATA}
        getLabel={(d) => d.label}
        getValue={(d) => d.value}
        getColor={(d) => d.color}
        margin={{ top: 20, right: 20, bottom: 60, left: 70 }}
      />
    </div>
  );
};

export default InvoiceBarChart;
