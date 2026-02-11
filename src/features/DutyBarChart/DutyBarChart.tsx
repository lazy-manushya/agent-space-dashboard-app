import React from "react";
import BarChart from "@/components/BarChart";
import { IDutyBarChartProps } from "./DutyBarChart.types";
import styles from "./DutyBarChart.module.css";

const DUMMY_DUTY_DATA = [
  { label: "BCD", value: 125000, color: "#667eea" },
  { label: "IGST", value: 280000, color: "#4facfe" },
  { label: "Health Cess", value: 45000, color: "#43e97b" },
  { label: "SWS", value: 68000, color: "#fa709a" },
  { label: "Additional", value: 92000, color: "#fee140" },
];

const DutyBarChart: React.FC<IDutyBarChartProps> = ({ className }) => {
  return (
    <div className={`${styles.Container} ${className || ""}`}>
      <BarChart
        data={DUMMY_DUTY_DATA}
        getLabel={(d) => d.label}
        getValue={(d) => d.value}
        getColor={(d) => d.color}
        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
      />
    </div>
  );
};

export default DutyBarChart;
