import React from 'react';
import BarChart from '@/components/BarChart';
import { BoeHeaderBarChartProps } from './BoeHeaderBarChart.types';
import styles from './BoeHeaderBarChart.module.css';

// Dummy data representing BOE statistics by port with modern vibrant colors
const DUMMY_PORT_DATA = [
  { label: 'JNPT', value: 1250, color: '#667eea' },
  { label: 'FSPL', value: 980, color: '#4facfe' },
  { label: 'ICCT', value: 750, color: '#43e97b' },
  { label: 'NSICT', value: 620, color: '#fa709a' },
  { label: 'IICCT', value: 450, color: '#fee140' },
];

const BoeHeaderBarChart: React.FC<BoeHeaderBarChartProps> = ({
  className = '',
}) => {
  return (
    <div className={`${styles.boeHeaderBarChart} ${className}`}>
      <h3 className={styles.chartTitle}>BOE Headers by Port</h3>
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