import React from "react";
import BarChart from "@/components/BarChart";
import { CHART_COLORS } from '@/config/colors';
import { IInvoiceBarChartProps } from "./InvoiceBarChart.types";
import styles from "./InvoiceBarChart.module.css";

const DUMMY_INVOICE_DATA = [
  { label: "ABC Trading", value: 3250000, color: CHART_COLORS[0] },
  { label: "Global Imports", value: 4180000, color: CHART_COLORS[1] },
  { label: "XYZ Corp", value: 2890000, color: CHART_COLORS[2] },
  { label: "Sunrise Exports", value: 5120000, color: CHART_COLORS[3] },
  { label: "Tech Solutions", value: 3760000, color: CHART_COLORS[4] },
];

const InvoiceBarChart: React.FC<IInvoiceBarChartProps> = ({ className }) => {
  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <BarChart
        data={DUMMY_INVOICE_DATA}
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      />
    </div>
  );
};

export default InvoiceBarChart;
