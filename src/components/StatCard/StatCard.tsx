import React from "react";

import { joinClassNames } from "@/utils/classNames";
import StatCardLoading from "./StatCard.loading";

import { StatCardProps } from "./StatCard.types";
import styles from "./StatCard.module.css";
import { statCardStylesConfig } from "./StatCard.config";

const StatCard: React.FC<StatCardProps> = ({
  className,
  primaryContent,
  secondaryContent,
  isLoading,
  color,
  icon,
  size,
}) => {
  if (isLoading) {
    return <StatCardLoading />;
  }

  return (
    <div
      className={joinClassNames(
        statCardStylesConfig({ size }),
        className
      )}
      style={{ "--color": color } as React.CSSProperties}
    >
      {!!icon && <div className={styles.Icon}>{icon}</div>}

      <div className={styles.ContentContainer}>
        {secondaryContent && (
          <div className={styles.SecondaryContent}>{secondaryContent}</div>
        )}
        <div className={styles.PrimaryContent}>{primaryContent}</div>
      </div>
    </div>
  );
};

export default StatCard;
