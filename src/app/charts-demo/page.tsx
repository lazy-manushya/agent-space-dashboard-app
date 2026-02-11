'use client';

import React from 'react';
import BoeHeaderBarChart from '@/features/BoeHeaderBarChart';
import BoeHeaderPieChart from '@/features/BoeHeaderPieChart';
import styles from './charts-demo.module.css';

export default function ChartsDemo() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>BOE Analytics Dashboard</h1>
        <p className={styles.subtitle}>
          Visual insights into Bill of Entry submissions and processing
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <BoeHeaderBarChart width={550} height={350} />
        </div>
        
        <div className={styles.chartCard}>
          <BoeHeaderPieChart width={500} height={350} showAsDonut={true} />
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <BoeHeaderPieChart width={500} height={350} showAsDonut={false} />
        </div>
        
        <div className={styles.chartCard}>
          <BoeHeaderBarChart width={550} height={350} />
        </div>
      </div>
    </div>
  );
}