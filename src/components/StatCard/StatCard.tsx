import React from "react";

import StatCardLoading from "./StatCard.loading";

import styles from "./StatCard.module.css";

export interface StatCardProps {
  className?: string;
  primaryContent: React.ReactNode;
  secondaryContent?: React.ReactNode;
  isLoading?: boolean;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  className,
  primaryContent,
  secondaryContent,
  isLoading,
  color,
}) => {
  if (isLoading) {
    return <StatCardLoading />;
  }

  return (
    <div className={`${styles.Stat} ${className || ""}`.trim()}>
      <span 
        className={styles.PrimaryContent}
        style={color ? { color } : {}}
      >
        {primaryContent}
      </span>
      {secondaryContent && (
        <span className={styles.SecondaryContent}>{secondaryContent}</span>
      )}
    </div>
  );
};

export default StatCard;
