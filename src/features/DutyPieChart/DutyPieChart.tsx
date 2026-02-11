import React from "react";
import PieChart from "@/components/PieChart";
import { IDutyPieChartProps } from "./DutyPieChart.types";
import styles from "./DutyPieChart.module.css";

// Duty data by CHA (Customs House Agent)
const DUMMY_DUTY_TYPE_DATA = [
  { label: "ABC Customs Services", value: 28, color: "#667eea" },
  { label: "Global Trade Logistics", value: 22, color: "#4facfe" },
  { label: "Express Clearance Co.", value: 18, color: "#43e97b" },
  { label: "Swift Customs Brokers", value: 15, color: "#fa709a" },
  { label: "Others", value: 17, color: "#fee140" },
];

const DutyPieChart: React.FC<IDutyPieChartProps> = ({ className }) => {
  const total = DUMMY_DUTY_TYPE_DATA.reduce((sum, d) => sum + d.value, 0);
  const avgPercentage = (total / DUMMY_DUTY_TYPE_DATA.length).toFixed(1);

  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <PieChart
        data={DUMMY_DUTY_TYPE_DATA}
        innerRadius={60}
      />
      <div className={styles.Stats}>
        <div className={styles.StatItem}>
          <div className={styles.StatLabel}>Total CHAs</div>
          <div className={styles.StatValue}>{DUMMY_DUTY_TYPE_DATA.length}</div>
        </div>
        <div className={styles.StatItem}>
          <div className={styles.StatLabel}>Avg %</div>
          <div className={styles.StatValue}>{avgPercentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default DutyPieChart;
