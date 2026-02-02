import React from "react";
import styles from "./StatCard.module.css";
import ShimmerLoader from "@/components/ShimmerLoader";

interface StatCardLoadingProps {
  className?: string;
}

const StatCardLoading: React.FC<StatCardLoadingProps> = ({ className }) => {
  return (
    <div className={`${styles.Stat} ${className || ""}`.trim()}>
      <ShimmerLoader.Default style={{ height: 40, width: 80, borderRadius: 8 }} />
      <ShimmerLoader.Default style={{ height: 24, width: 40, borderRadius: 8, marginLeft: 8 }} />
    </div>
  );
};

export default StatCardLoading;
