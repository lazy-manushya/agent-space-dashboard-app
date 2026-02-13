import React from "react";

import StatCardLoading from "./StatCard.loading";

import styles from "./StatCard.module.css";

export interface StatCardProps {
  className?: string;
  primaryContent: React.ReactNode;
  secondaryContent?: React.ReactNode;
  isLoading?: boolean;
  color?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  className,
  primaryContent,
  secondaryContent,
  isLoading,
  color,
  icon,
}) => {
  if (isLoading) {
    return <StatCardLoading />;
  }

  return (
    <div className={`${styles.Stat} ${className || ""}`.trim()}>
      {icon}
      <div className="h-100 flex-grow-1 d-flex flex-column gap-3 justify-content-center align-items-center">
        {secondaryContent && (
          <div className={styles.SecondaryContent}>{secondaryContent}</div>
        )}
        <div className={styles.PrimaryContent} style={color ? { color } : {}}>
          {primaryContent}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
