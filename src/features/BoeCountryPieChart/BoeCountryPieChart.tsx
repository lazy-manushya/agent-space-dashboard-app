import React, { useMemo } from "react";
import PieChart from "@/components/PieChart";
import { CHART_COLORS } from '@/config/colors';
import { BoeCountryPieChartProps } from "./BoeCountryPieChart.types";
import styles from "./BoeCountryPieChart.module.css";

// Country distribution data
const DUMMY_COUNTRY_DATA = [
  { label: "India", value: 1102, color: CHART_COLORS[0] },
  { label: "United States", value: 785, color: CHART_COLORS[1] },
  { label: "China", value: 343, color: CHART_COLORS[2] },
  { label: "Germany", value: 147, color: CHART_COLORS[3] },
  { label: "Japan", value: 73, color: CHART_COLORS[4] },
];

const BoeCountryPieChart: React.FC<BoeCountryPieChartProps> = ({
  className = "",
  showAsDonut = true,
  hideTitle = false,
  chartMargin = 30,
}) => {
  return (
    <div className={`${styles.boeCountryPieChart} ${className}`}>
      {!hideTitle && (
        <>
          <p className={styles.chartSubtitle}>
            Distribution of imports by country of origin
          </p>
        </>
      )}
      <div className={styles.chartContainer}>
        <PieChart
          data={DUMMY_COUNTRY_DATA}
          margin={{
            top: chartMargin,
            right: chartMargin,
            bottom: chartMargin,
            left: chartMargin,
          }}
          showLabels={false}
          animate={true}
          innerRadius={showAsDonut ? 60 : 0}
        />
      </div>
    </div>
  );
};

export default BoeCountryPieChart;
