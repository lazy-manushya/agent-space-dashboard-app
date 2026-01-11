import React from "react";
import styles from "./RingLoader.module.css";

const RingLoader: React.FC<{
  size?: string;
  className?: string;
  color?: string;
}> = ({ size = "1.5rem", className, color }) => {
  return (
    <div
      className={`${styles.loader} ${className || ""}`}
      style={
        { width: size, height: size, "--color": color } as React.CSSProperties
      }
    />
  );
};

export default RingLoader;
