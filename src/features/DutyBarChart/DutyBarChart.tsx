import React, { useMemo } from "react";
import BarChart from "@/components/BarChart";
import { IDutyBarChartProps } from "./DutyBarChart.types";
import styles from "./DutyBarChart.module.css";

// Duty data by Port
const DUMMY_DUTY_DATA = [
  { label: "INABG1", value: 12500000, color: "#667eea" },
  { label: "INNSA1", value: 8900000, color: "#4facfe" },
  { label: "INMAA1", value: 7200000, color: "#43e97b" },
  { label: "INBLR4", value: 6800000, color: "#fa709a" },
  { label: "INDEL1", value: 5300000, color: "#fee140" },
  { label: "INCCU1", value: 4980000, color: "#00d4ff" },
];

const DutyBarChart: React.FC<IDutyBarChartProps> = ({ className }) => {
  // Calculate total and percentages
  const stats = useMemo(() => {
    const total = DUMMY_DUTY_DATA.reduce((sum, item) => sum + item.value, 0);
    const dataWithPercentages = DUMMY_DUTY_DATA.map((item) => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(1),
    }));
    return { total, dataWithPercentages };
  }, []);

  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <BarChart
        data={DUMMY_DUTY_DATA}
        getLabel={(d) => d.label}
        getValue={(d) => d.value}
        getColor={(d) => d.color}
        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
      />
      <div className={styles.PortStats}>
        {stats.dataWithPercentages.map((item, index) => (
          <div key={index} className={styles.PortStatItem}>
            <div
              className={styles.PortStatColor}
              style={{ backgroundColor: item.color }}
            />
            <span className={styles.PortStatLabel}>{item.label}</span>
            <span className={styles.PortStatValue}>
              ₹{(item.value / 1000000).toFixed(1)}M ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DutyBarChart;
