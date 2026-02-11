import React, { useState, useMemo } from "react";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { scaleOrdinal } from "@visx/scale";
import { ParentSize } from "@visx/responsive";

import { PieChartProps, PieChartData } from "./PieChart.types";
import styles from "./PieChart.module.css";

const defaultMargin = { top: 20, right: 30, bottom: 40, left: 30 };

// Modern vibrant color palette
const MODERN_PIE_COLORS = [
  '#667eea', // Vibrant Purple
  '#4facfe', // Bright Blue
  '#43e97b', // Fresh Green
  '#fa709a', // Coral Pink
  '#fee140', // Sunny Yellow
  '#30cfd0', // Turquoise
  '#a8edea', // Mint
  '#ff6b6b', // Warm Red
  '#c44569', // Berry
];

interface PieChartInnerProps extends Omit<PieChartProps, "width" | "height"> {
  width: number;
  height: number;
}

const PieChartInner: React.FC<PieChartInnerProps> = ({
  data,
  width,
  height,
  margin = defaultMargin,
  className = "",
  animate = true,
  showLabels = true,
  innerRadius = 0,
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<PieChartData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate total for percentage calculation
  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data],
  );

  // Bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  // Color scale with modern palette
  const colorScale = scaleOrdinal<string, string>({
    domain: data.map((d) => d.label),
    range: data.map((d, i) => d.color || MODERN_PIE_COLORS[i % MODERN_PIE_COLORS.length]),
  });

  // Accessor functions
  const getValue = (d: PieChartData) => d.value;
  const getLabel = (d: PieChartData) => d.label;

  const handleSliceHover = (event: React.MouseEvent, d: PieChartData) => {
    setHoveredSlice(d);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleSliceLeave = () => {
    setHoveredSlice(null);
  };

  const calculatePercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  // Calculate chart area dimensions (excluding legend)
  const chartHeight = height - 80; // Reserve space for legend at bottom

  // Recalculate bounds with adjusted height
  const chartInnerWidth = width - margin.left - margin.right;
  const chartInnerHeight = chartHeight - margin.top - margin.bottom;
  const chartRadius = Math.min(chartInnerWidth, chartInnerHeight) / 2;
  const chartCenterY = chartInnerHeight / 2;
  const chartCenterX = chartInnerWidth / 2;

  return (
    <div className={`${styles.pieChart} ${className}`}>
      <div className={styles.chartContainer}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${chartHeight}`} className={styles.chartSvg}>
          {/* Gradient definitions for slices */}
          <defs>
            {data.map((d, i) => {
              const color = d.color || MODERN_PIE_COLORS[i % MODERN_PIE_COLORS.length];
              return (
                <radialGradient
                  key={`pie-gradient-${d.label}`}
                  id={`pie-gradient-${i}`}
                  cx="30%"
                  cy="30%"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                </radialGradient>
              );
            })}
          </defs>
          <Group top={chartCenterY + margin.top} left={chartCenterX + margin.left}>
            <Pie
              data={data}
              pieValue={getValue}
              outerRadius={mounted && animate ? chartRadius : 0}
              innerRadius={mounted && animate ? innerRadius : 0}
            >
              {(pie) => {
                return pie.arcs.map((arc, i) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath = pie.path(arc) || "";

                  return (
                    <g
                      key={`arc-${getLabel(arc.data)}`}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.3s ease`,
                      }}
                    >
                      <path
                        d={arcPath}
                        fill={`url(#pie-gradient-${i})`}
                        className={styles.pieSlice}
                        onMouseEnter={(event) =>
                          handleSliceHover(event, arc.data)
                        }
                        onMouseLeave={handleSliceLeave}
                        style={{
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      {hasSpaceForLabel && showLabels && (
                        <text
                          x={centroidX * 1.8}
                          y={centroidY * 1.8}
                          dy=".33em"
                          className={styles.pieLabel}
                          style={{
                            fill: colorScale(getLabel(arc.data)),
                          }}
                        >
                          {calculatePercentage(arc.data.value)}%
                        </text>
                      )}
                    </g>
                  );
                });
              }}
            </Pie>
          </Group>
        </svg>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        {data.map((d, i) => (
          <div key={`legend-${d.label}`} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{
                backgroundColor:
                  d.color || `hsl(${(i * 137.5) % 360}, 70%, 50%)`,
              }}
            />
            <span>{d.label}</span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredSlice && (
        <div
          className={styles.tooltip}
          style={{
            position: "fixed",
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
          }}
        >
          <div>
            <strong>{hoveredSlice.label}</strong>
          </div>
          <div>Value: {hoveredSlice.value.toLocaleString()}</div>
          <div>Percentage: {calculatePercentage(hoveredSlice.value)}%</div>
        </div>
      )}
    </div>
  );
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { width, height, ...rest } = props;

  // If width and height are provided, use them directly
  if (width && height) {
    return <PieChartInner width={width} height={height} {...rest} />;
  }

  // Otherwise, make it responsive
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
      <ParentSize>
        {({ width: parentWidth, height: parentHeight }) => (
          <PieChartInner width={parentWidth} height={parentHeight} {...rest} />
        )}
      </ParentSize>
    </div>
  );
};

export default PieChart;
