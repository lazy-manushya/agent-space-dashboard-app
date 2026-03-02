import React from "react";
import PieChart from "@/components/PieChart";
import { CHART_COLORS } from '@/config/colors';
import { IDutyPieChartProps } from "./DutyPieChart.types";
import styles from "./DutyPieChart.module.css";

// Duty data by CHA (Customs House Agent)
const DUMMY_DUTY_TYPE_DATA = [
  { label: "ABC Customs Services", value: 28, color: CHART_COLORS[0] },
  { label: "Global Trade Logistics", value: 22, color: CHART_COLORS[1] },
  { label: "Express Clearance Co.", value: 18, color: CHART_COLORS[2] },
  { label: "Swift Customs Brokers", value: 15, color: CHART_COLORS[3] },
  { label: "Others", value: 17, color: CHART_COLORS[4] },
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
