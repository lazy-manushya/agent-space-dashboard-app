import React from "react";
import PieChart from "@/components/PieChart";
import { IInvoicePieChartProps } from "./InvoicePieChart.types";
import styles from "./InvoicePieChart.module.css";

const DUMMY_CURRENCY_DATA = [
  { label: "USD", value: 42, color: "#667eea" },
  { label: "EUR", value: 28, color: "#4facfe" },
  { label: "GBP", value: 15, color: "#43e97b" },
  { label: "INR", value: 10, color: "#fa709a" },
  { label: "JPY", value: 5, color: "#fee140" },
];

const InvoicePieChart: React.FC<IInvoicePieChartProps> = ({ className }) => {
  const total = DUMMY_CURRENCY_DATA.reduce((sum, d) => sum + d.value, 0);
  const currencies = DUMMY_CURRENCY_DATA.length;

  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <PieChart
        data={DUMMY_CURRENCY_DATA}
        innerRadius={60}
      />
      <div className={styles.Stats}>
        <div className={styles.StatItem}>
          <div className={styles.StatLabel}>Currencies</div>
          <div className={styles.StatValue}>{currencies}</div>
        </div>
        <div className={styles.StatItem}>
          <div className={styles.StatLabel}>Total %</div>
          <div className={styles.StatValue}>{total}%</div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePieChart;
