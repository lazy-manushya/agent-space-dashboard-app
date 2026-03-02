import React, { useMemo } from "react";
import PieChart from "@/components/PieChart";
import { CHART_COLORS } from '@/config/colors';
import { BoeHeaderPieChartProps } from "./BoeHeaderPieChart.types";
import styles from "./BoeHeaderPieChart.module.css";

// Duty split data representing different duty components
const DUMMY_STATUS_DATA = [
  { label: "Basic Customs Duty", value: 4250, color: CHART_COLORS[0] },
  { label: "Social Welfare Surcharge", value: 425, color: CHART_COLORS[1] },
  { label: "IGST", value: 8925, color: CHART_COLORS[2] },
  { label: "Penalty/Interest/Fine", value: 150, color: CHART_COLORS[3] },
];

const BoeHeaderPieChart: React.FC<BoeHeaderPieChartProps> = ({
  className = "",
  showAsDonut = true,
  hideTitle = false,
  chartMargin = 30,
}) => {
  // Calculate statistics from duty data
  const stats = useMemo(() => {
    const total = DUMMY_STATUS_DATA.reduce((sum, item) => sum + item.value, 0);
    const bcd =
      DUMMY_STATUS_DATA.find((item) => item.label === "Basic Customs Duty")?.value || 0;
    const sws =
      DUMMY_STATUS_DATA.find((item) => item.label === "Social Welfare Surcharge")?.value || 0;
    const igst =
      DUMMY_STATUS_DATA.find((item) => item.label === "IGST")?.value || 0;
    const penalty =
      DUMMY_STATUS_DATA.find((item) => item.label === "Penalty/Interest/Fine")?.value || 0;

    return {
      total,
      bcd,
      sws,
      igst,
      penalty,
    };
  }, []);

  return (
    <div className={`${styles.boeHeaderPieChart} ${className}`}>
      {!hideTitle && (
        <>
          <p className={styles.chartSubtitle}>
            Breakdown of duty components across all Bill of Entry submissions
          </p>
        </>
      )}
      <div className={styles.chartContainer}>
        <PieChart
          data={DUMMY_STATUS_DATA}
          margin={{ top: chartMargin, right: chartMargin, bottom: chartMargin, left: chartMargin }}
          showLabels={false}
          animate={true}
          innerRadius={showAsDonut ? 60 : 0}
        />
      </div>

      {false && (
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Duty</span>
            <span className={styles.statValue}>
              {stats.total.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>BCD</span>
            <span className={styles.statValue}>
              {stats.bcd.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>SWS</span>
            <span className={styles.statValue}>
              {stats.sws.toLocaleString()}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>IGST</span>
            <span className={styles.statValue}>
              {stats.igst.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoeHeaderPieChart;
