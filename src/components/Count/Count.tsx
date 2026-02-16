import React, { useEffect, useState, useRef } from "react";
import { CountProps } from "./Count.types";
import styles from "./Count.module.css";

const Count: React.FC<CountProps> = ({
  value: valueFromProps,
  duration = 1000,
  className = "",
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    const start = startValueRef.current;
    const value = Math.ceil(valueFromProps);
    const change = value - start;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quart function for smooth, dramatic deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      const current = start + change * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        startValueRef.current = value;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [valueFromProps, duration]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <span className={`${styles.count} ${className}`}>{formattedValue}</span>
  );
};

export default Count;
