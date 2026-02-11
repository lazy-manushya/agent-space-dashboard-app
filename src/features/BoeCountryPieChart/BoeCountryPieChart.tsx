import React, { useMemo } from "react";
import PieChart from "@/components/PieChart";
import { BoeCountryPieChartProps } from "./BoeCountryPieChart.types";
import styles from "./BoeCountryPieChart.module.css";

// Country distribution data
const DUMMY_COUNTRY_DATA = [
  { label: "India", value: 1102, color: "#667eea" },
  { label: "United States", value: 785, color: "#4facfe" },
  { label: "China", value: 343, color: "#43e97b" },
  { label: "Germany", value: 147, color: "#fa709a" },
  { label: "Japan", value: 73, color: "#fee140" },
];

const BoeCountryPieChart: React.FC<BoeCountryPieChartProps> = ({
  className = "",
  showAsDonut = true,
  hideTitle = false,
  chartMargin = 30,
}) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const total = DUMMY_COUNTRY_DATA.reduce((sum, item) => sum + item.value, 0);

    return {
      total,
      countries: DUMMY_COUNTRY_DATA.length,
      topCountry: DUMMY_COUNTRY_DATA[0],
    };
  }, []);

  return (
    <div className={`${styles.boeCountryPieChart} ${className}`}>
      {!hideTitle && (
        <>
          <h3 className={styles.chartTitle}>Country Split</h3>
          <p className={styles.chartSubtitle}>
            Distribution of imports by country of origin
          </p>
        </>
      )}
      <div className={styles.chartContainer}>
        <PieChart
          data={DUMMY_COUNTRY_DATA}
          margin={{ top: chartMargin, right: chartMargin, bottom: chartMargin, left: chartMargin }}
          showLabels={false}
          animate={true}
          innerRadius={showAsDonut ? 60 : 0}
        />
      </div>
    </div>
  );
};

export default BoeCountryPieChart;
