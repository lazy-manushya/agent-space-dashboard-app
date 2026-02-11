import React from 'react';
import { BoeHeaderDisplayProps } from './BoeHeaderDisplay.types';
import styles from './BoeHeaderDisplay.module.css';

const BoeHeaderDisplay: React.FC<BoeHeaderDisplayProps> = ({
  header,
  className = '',
}) => {
  return (
    <div className={`${styles.boeHeaderDisplay} ${className}`}>
      <h4 className={styles.detailsTitle}>Details</h4>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Year:</span>
          <span className={styles.detailValue}>{header.year}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>IEC Number:</span>
          <span className={styles.detailValue}>{header.iec_no}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>GST Number:</span>
          <span className={styles.detailValue}>{header.gst_no}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Port Code:</span>
          <span className={styles.detailValue}>{header.port_code}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>BE Date:</span>
          <span className={styles.detailValue}>{header.be_date}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Packages:</span>
          <span className={styles.detailValue}>
            {header.pkg?.toLocaleString()}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Gross Weight:</span>
          <span className={styles.detailValue}>
            {header.g_wt?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Exchange Rate (Exact):</span>
          <span className={styles.detailValue}>{header.ex_rate}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Number of Invoices:</span>
          <span className={styles.detailValue}>
            {header.no_of_invoices}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Total Items:</span>
          <span className={styles.detailValue}>
            {header.total_items}
          </span>
        </div>
        {header.submission && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Submission:</span>
            <span className={styles.detailValue}>
              {header.submission}
            </span>
          </div>
        )}
        {header.assessment && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Assessment:</span>
            <span className={styles.detailValue}>
              {header.assessment}
            </span>
          </div>
        )}
        {header.examination && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Examination:</span>
            <span className={styles.detailValue}>
              {header.examination}
            </span>
          </div>
        )}
        {header.ooc && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>OOC:</span>
            <span className={styles.detailValue}>{header.ooc}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoeHeaderDisplay;