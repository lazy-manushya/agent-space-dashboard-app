import React, { useMemo } from "react";
import PieChart from "@/components/PieChart";
import { BoeAirSeaPieChartProps } from "./BoeAirSeaPieChart.types";
import styles from "./BoeAirSeaPieChart.module.css";

// Air vs Sea shipment data with detailed metrics
const DUMMY_AIR_SEA_DATA = {
  air: {
    billOfEntries: 1593,
    assessableValue: 12450000,
    duty: 2245000,
  },
  sea: {
    billOfEntries: 857,
    assessableValue: 8920000,
    duty: 1605000,
  },
};

// Data for the pie chart visualization
const PIE_CHART_DATA = [
  { label: "Air Shipments", value: DUMMY_AIR_SEA_DATA.air.billOfEntries, color: "#667eea" },
  { label: "Sea Shipments", value: DUMMY_AIR_SEA_DATA.sea.billOfEntries, color: "#4facfe" },
];

const BoeAirSeaPieChart: React.FC<BoeAirSeaPieChartProps> = ({
  className = "",
  showAsDonut = true,
  hideTitle = false,
}) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalBOE = DUMMY_AIR_SEA_DATA.air.billOfEntries + DUMMY_AIR_SEA_DATA.sea.billOfEntries;
    const totalValue = DUMMY_AIR_SEA_DATA.air.assessableValue + DUMMY_AIR_SEA_DATA.sea.assessableValue;
    const totalDuty = DUMMY_AIR_SEA_DATA.air.duty + DUMMY_AIR_SEA_DATA.sea.duty;

    return {
      air: {
        boe: DUMMY_AIR_SEA_DATA.air.billOfEntries,
        value: DUMMY_AIR_SEA_DATA.air.assessableValue,
        duty: DUMMY_AIR_SEA_DATA.air.duty,
        boePercent: ((DUMMY_AIR_SEA_DATA.air.billOfEntries / totalBOE) * 100).toFixed(1),
      },
      sea: {
        boe: DUMMY_AIR_SEA_DATA.sea.billOfEntries,
        value: DUMMY_AIR_SEA_DATA.sea.assessableValue,
        duty: DUMMY_AIR_SEA_DATA.sea.duty,
        boePercent: ((DUMMY_AIR_SEA_DATA.sea.billOfEntries / totalBOE) * 100).toFixed(1),
      },
      total: {
        boe: totalBOE,
        value: totalValue,
        duty: totalDuty,
      },
    };
  }, []);

  return (
    <div className={`${styles.boeAirSeaPieChart} ${className}`}>
      {!hideTitle && (
        <>
          <p className={styles.chartSubtitle}>
            Distribution of shipments by transport mode
          </p>
        </>
      )}
      <div className={styles.chartContainer}>
        <PieChart
          data={PIE_CHART_DATA}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          showLabels={false}
          animate={true}
          innerRadius={showAsDonut ? 60 : 0}
        />
      </div>

      {!hideTitle && (
        <div className={styles.statsContainer}>
          <div className={styles.statsRow}>
            <div className={styles.statCategory}>
              <h4 className={styles.categoryTitle}>Air Shipments</h4>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>BOE:</span>
                  <span className={styles.statValue}>{stats.air.boe.toLocaleString()}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Value:</span>
                  <span className={styles.statValue}>₹{(stats.air.value / 100000).toFixed(2)}L</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Duty:</span>
                  <span className={styles.statValue}>₹{(stats.air.duty / 100000).toFixed(2)}L</span>
                </div>
              </div>
            </div>

            <div className={styles.statCategory}>
              <h4 className={styles.categoryTitle}>Sea Shipments</h4>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>BOE:</span>
                  <span className={styles.statValue}>{stats.sea.boe.toLocaleString()}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Value:</span>
                  <span className={styles.statValue}>₹{(stats.sea.value / 100000).toFixed(2)}L</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Duty:</span>
                  <span className={styles.statValue}>₹{(stats.sea.duty / 100000).toFixed(2)}L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoeAirSeaPieChart;
