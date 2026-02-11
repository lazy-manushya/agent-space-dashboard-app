import React, { useState, useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { BarChartProps, BarChartData } from './BarChart.types';
import styles from './BarChart.module.css';

const defaultMargin = { top: 20, right: 30, bottom: 40, left: 50 };

interface BarChartInnerProps extends Omit<BarChartProps, 'width' | 'height'> {
  width: number;
  height: number;
}

// Modern color palette with gradients
const MODERN_COLORS = [
  '#667eea', // Purple
  '#764ba2', // Deep Purple
  '#f093fb', // Pink
  '#4facfe', // Blue
  '#00f2fe', // Cyan
  '#43e97b', // Green
  '#38f9d7', // Teal
  '#fa709a', // Rose
  '#fee140', // Yellow
];

const BarChartInner: React.FC<BarChartInnerProps> = ({
  data,
  width,
  height,
  margin = defaultMargin,
  className = '',
  animate = true,
  showLabels = true,
}) => {
  const [hoveredBar, setHoveredBar] = useState<BarChartData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Delay visibility to prevent flickering
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map((d) => d.label),
        padding: 0.4,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map((d) => d.value))],
      }),
    [yMax, data]
  );

  const handleBarHover = (event: React.MouseEvent, d: BarChartData) => {
    setHoveredBar(d);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
  };

  return (
    <div className={`${styles.barChart} ${className}`}>
      <div className={styles.chartContainer}>
        <svg
          width={width}
          height={height}
          className={styles.chartSvg}
          style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
          <Group left={margin.left} top={margin.top}>
            {/* Grid lines */}
            <GridRows
              scale={yScale}
              width={xMax}
              height={yMax}
              stroke="var(--table-border)"
              strokeOpacity={0.3}
              strokeWidth={0.5}
            />
            
            {/* Gradient definitions */}
            <defs>
              {data.map((d, i) => {
                const color = d.color || MODERN_COLORS[i % MODERN_COLORS.length];
                return (
                  <linearGradient
                    key={`gradient-${d.label}`}
                    id={`bar-gradient-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Bars */}
            {data.map((d, i) => {
              const barWidth = xScale.bandwidth();
              const targetHeight = yMax - (yScale(d.value) ?? 0);
              const barHeight = animate && mounted ? targetHeight : 0;
              const barX = xScale(d.label);
              const barY = yMax - barHeight;
              
              return (
                <Bar
                  key={`bar-${d.label}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={`url(#bar-gradient-${i})`}
                  className={styles.bar}
                  onMouseEnter={(event) => handleBarHover(event, d)}
                  onMouseLeave={handleBarLeave}
                  rx={4}
                  style={{
                    transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1), y 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              );
            })}

            {/* Axes */}
            <AxisBottom
              top={yMax}
              scale={xScale}
              tickFormat={(value) => value}
              tickLabelProps={{
                fill: 'var(--table-meta-info)',
                fontSize: 12,
                textAnchor: 'middle',
              }}
            />
            <AxisLeft
              scale={yScale}
              tickFormat={(value) => value.toString()}
              tickLabelProps={{
                fill: 'var(--table-meta-info)',
                fontSize: 12,
                textAnchor: 'end',
                dx: '-0.25em',
                dy: '0.25em',
              }}
            />

            {/* Labels */}
            {showLabels && data.map((d) => {
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - (yScale(d.value) ?? 0);
              const barX = xScale(d.label);
              const barY = yMax - barHeight;
              
              return (
                <text
                  key={`label-${d.label}`}
                  x={(barX ?? 0) + barWidth / 2}
                  y={barY - 5}
                  className={styles.barLabel}
                >
                  {d.value}
                </text>
              );
            })}
          </Group>
        </svg>
      </div>

      {/* Tooltip */}
      {hoveredBar && (
        <div
          className={styles.tooltip}
          style={{
            position: 'fixed',
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
          }}
        >
          <div><strong>{hoveredBar.label}</strong></div>
          <div>Value: {hoveredBar.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { width, height, ...rest } = props;
  
  // If width and height are provided, use them directly
  if (width && height) {
    return <BarChartInner width={width} height={height} {...rest} />;
  }
  
  // Otherwise, make it responsive
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ParentSize>
        {({ width: parentWidth, height: parentHeight }) => (
          <BarChartInner
            width={parentWidth}
            height={parentHeight}
            {...rest}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default BarChart;