export interface PieChartData {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartData[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  className?: string;
  animate?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
}