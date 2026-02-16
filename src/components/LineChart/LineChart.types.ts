export interface LineChartData {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartProps {
  data: LineChartData[];
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
  showDots?: boolean;
  showArea?: boolean;
  strokeWidth?: number;
  curve?: 'linear' | 'basis' | 'cardinal' | 'monotone';
}