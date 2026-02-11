import React, { useMemo } from "react";
import PieChart from "@/components/PieChart";
import { BoeHeaderPieChartProps } from "./BoeHeaderPieChart.types";
import styles from "./BoeHeaderPieChart.module.css";

// Dummy data representing BOE submission status with modern vibrant colors
const DUMMY_STATUS_DATA = [
  { label: "Cleared", value: 1850, color: "#43e97b" },
  { label: "Under Assessment", value: 720, color: "#4facfe" },
  { label: "Under Examination", value: 480, color: "#667eea" },
  { label: "Pending OOC", value: 320, color: "#fa709a" },
  { label: "Others", value: 180, color: "#fee140" },
];

const BoeHeaderPieChart: React.FC<BoeHeaderPieChartProps> = ({
  className = "",
  showAsDonut = true,
}) => {
  // Calculate statistics from dummy data
  const stats = useMemo(() => {
    const total = DUMMY_STATUS_DATA.reduce((sum, item) => sum + item.value, 0);
    const cleared =
      DUMMY_STATUS_DATA.find((item) => item.label === "Cleared")?.value || 0;
    const pending = DUMMY_STATUS_DATA.filter(
      (item) => item.label !== "Cleared",
    ).reduce((sum, item) => sum + item.value, 0);

    return {
      total,
      cleared,
      pending,
      clearanceRate: ((cleared / total) * 100).toFixed(1),
    };
  }, []);

  return (
    <div className={`${styles.boeHeaderPieChart} ${className}`}>
      <h3 className={styles.chartTitle}>BOE Status Distribution</h3>
      <p className={styles.chartSubtitle}>
        Current status breakdown of all Bill of Entry submissions
      </p>
      <div className={styles.chartContainer}>
        <PieChart
          data={DUMMY_STATUS_DATA}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          showLabels={true}
          animate={true}
          innerRadius={showAsDonut ? 60 : 0}
        />
      </div>

      {false && (
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total BOEs</span>
            <span className={styles.statValue}>
              {stats.total.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Cleared</span>
            <span className={styles.statValue}>
              {stats.cleared.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Pending</span>
            <span className={styles.statValue}>
              {stats.pending.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Clearance Rate</span>
            <span className={styles.statValue}>{stats.clearanceRate}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoeHeaderPieChart;
