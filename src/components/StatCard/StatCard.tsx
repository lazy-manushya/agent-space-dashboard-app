import React from "react";

import StatCardLoading from "./StatCard.loading";

import styles from "./StatCard.module.css";

export interface StatCardProps {
  className?: string;
  primaryContent: React.ReactNode;
  secondaryContent?: React.ReactNode;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  className,
  primaryContent,
  secondaryContent,
  isLoading,
}) => {
  if (isLoading) {
    return <StatCardLoading />;
  }

  return (
    <div className={`${styles.Stat} ${className || ""}`.trim()}>
      <span className={styles.PrimaryContent}>{primaryContent}</span>
      {secondaryContent && (
        <span className={styles.SecondaryContent}>{secondaryContent}</span>
      )}
    </div>
  );
};

export default StatCard;
