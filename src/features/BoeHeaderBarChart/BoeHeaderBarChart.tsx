import React from 'react';
import BarChart from '@/components/BarChart';
import { CHART_COLORS } from '@/config/colors';
import { BoeHeaderBarChartProps } from './BoeHeaderBarChart.types';
import styles from './BoeHeaderBarChart.module.css';

// Dummy data representing BOE statistics by port with centralized colors
const DUMMY_PORT_DATA = [
  { label: 'JNPT', value: 1250, color: CHART_COLORS[0] },
  { label: 'FSPL', value: 980, color: CHART_COLORS[1] },
  { label: 'ICCT', value: 750, color: CHART_COLORS[2] },
  { label: 'NSICT', value: 620, color: CHART_COLORS[3] },
  { label: 'IICCT', value: 450, color: CHART_COLORS[4] },
];

const BoeHeaderBarChart: React.FC<BoeHeaderBarChartProps> = ({
  className = '',
}) => {
  return (
    <div className={`${styles.boeHeaderBarChart} ${className}`}>
      <p className={styles.chartSubtitle}>
        Distribution of Bill of Entry submissions across major ports
      </p>
      <div className={styles.chartContainer}>
        <BarChart
          data={DUMMY_PORT_DATA}
          margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
          showLabels={true}
          animate={true}
        />
      </div>
    </div>
  );
};

export default BoeHeaderBarChart;