import React from "react";
import PieChart from "@/components/PieChart";
import { IDutyPieChartProps } from "./DutyPieChart.types";
import styles from "./DutyPieChart.module.css";

const DUMMY_DUTY_TYPE_DATA = [
  { label: "BCD", value: 35, color: "#667eea" },
  { label: "IGST", value: 45, color: "#4facfe" },
  { label: "Health Cess", value: 8, color: "#43e97b" },
  { label: "SWS", value: 12, color: "#fa709a" },
];

const DutyPieChart: React.FC<IDutyPieChartProps> = ({ className }) => {
  const total = DUMMY_DUTY_TYPE_DATA.reduce((sum, d) => sum + d.value, 0);
  const avgPercentage = (total / DUMMY_DUTY_TYPE_DATA.length).toFixed(1);

  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <PieChart
        data={DUMMY_DUTY_TYPE_DATA}
        getLabel={(d) => d.label}
        getValue={(d) => d.value}
        getColor={(d) => d.color}
        innerRadius={60}
      />
      <div className={styles.Stats}>
        <div className={styles.StatItem}>
          <div className={styles.StatLabel}>Types</div>
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
