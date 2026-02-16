import React, { useState, useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath, AreaClosed, Circle } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { curveMonotoneX, curveLinear, curveBasis, curveCardinal } from '@visx/curve';
import { LineChartProps, LineChartData } from './LineChart.types';
import styles from './LineChart.module.css';

const defaultMargin = { top: 20, right: 30, bottom: 40, left: 50 };

interface LineChartInnerProps extends Omit<LineChartProps, 'width' | 'height'> {
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

const getCurveType = (curve: string) => {
  switch (curve) {
    case 'basis':
      return curveBasis;
    case 'cardinal':
      return curveCardinal;
    case 'monotone':
      return curveMonotoneX;
    case 'linear':
    default:
      return curveLinear;
  }
};

const LineChartInner: React.FC<LineChartInnerProps> = ({
  data,
  width,
  height,
  margin = defaultMargin,
  className = '',
  animate = true,
  showDots = true,
  showArea = false,
  strokeWidth = 2,
  curve = 'monotone',
}) => {
  const [hoveredDot, setHoveredDot] = useState<LineChartData | null>(null);
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
      scalePoint<string>({
        range: [0, xMax],
        domain: data.map((d) => d.label),
        padding: 0.1,
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

  // Accessors
  const x = (d: LineChartData) => xScale(d.label) ?? 0;
  const y = (d: LineChartData) => yScale(d.value) ?? 0;

  const handleDotHover = (event: React.MouseEvent, d: LineChartData) => {
    setHoveredDot(d);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleDotLeave = () => {
    setHoveredDot(null);
  };

  const lineColor = data[0]?.color || MODERN_COLORS[0];
  const curveType = getCurveType(curve);

  return (
    <div className={`${styles.lineChart} ${className}`}>
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
            
            {/* Gradient definitions for area fill */}
            {showArea && (
              <defs>
                <linearGradient
                  id="line-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={lineColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
            )}

            {/* Area fill (if enabled) */}
            {showArea && mounted && (
              <AreaClosed<LineChartData>
                data={data}
                x={x}
                y={y}
                yScale={yScale}
                fill="url(#line-gradient)"
                curve={curveType}
                className={styles.areaPath}
              />
            )}

            {/* Line path */}
            <LinePath<LineChartData>
              data={data}
              x={x}
              y={y}
              stroke={lineColor}
              strokeWidth={strokeWidth}
              curve={curveType}
              className={styles.linePath}
              style={{
                strokeDasharray: animate && !mounted ? '1000' : 'none',
                strokeDashoffset: animate && !mounted ? '1000' : '0',
                transition: 'stroke-dashoffset 1s ease-out',
              }}
            />

            {/* Data points */}
            {showDots && data.map((d, i) => {
              const cx = x(d);
              const cy = y(d);
              const dotColor = d.color || lineColor;
              
              return (
                <Circle
                  key={`dot-${d.label}`}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={dotColor}
                  stroke="white"
                  strokeWidth={2}
                  className={styles.dot}
                  onMouseEnter={(event) => handleDotHover(event, d)}
                  onMouseLeave={handleDotLeave}
                  style={{
                    opacity: animate && !mounted ? 0 : 1,
                    transition: `opacity 0.5s ease ${0.1 * i}s`,
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
          </Group>
        </svg>
      </div>

      {/* Tooltip */}
      {hoveredDot && (
        <div
          className={styles.tooltip}
          style={{
            position: 'fixed',
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
          }}
        >
          <div><strong>{hoveredDot.label}</strong></div>
          <div>Value: {hoveredDot.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { width, height, ...rest } = props;
  
  // If width and height are provided, use them directly
  if (width && height) {
    return <LineChartInner width={width} height={height} {...rest} />;
  }
  
  // Otherwise, make it responsive
  return (
    <div style={{ width: '100%', height: '100%'}}>
      <ParentSize>
        {({ width: parentWidth, height: parentHeight }) => (
          <LineChartInner
            width={parentWidth}
            height={parentHeight}
            {...rest}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default LineChart;