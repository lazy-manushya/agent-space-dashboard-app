import React, { useState, useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { BarChartProps, BarChartData } from './BarChart.types';
import styles from './BarChart.module.css';

const defaultMargin = { top: 20, right: 30, bottom: 40, left: 50 };

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 300,
  margin = defaultMargin,
  className = '',
  animate = true,
  showLabels = true,
}) => {
  const [hoveredBar, setHoveredBar] = useState<BarChartData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
        <svg width={width} height={height} className={styles.chartSvg}>
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
            
            {/* Bars */}
            {data.map((d, i) => {
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - (yScale(d.value) ?? 0);
              const barX = xScale(d.label);
              const barY = yMax - barHeight;
              
              return (
                <Bar
                  key={`bar-${d.label}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.color || `hsl(${(i * 137.5) % 360}, 70%, 50%)`}
                  className={styles.bar}
                  onMouseEnter={(event) => handleBarHover(event, d)}
                  onMouseLeave={handleBarLeave}
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

export default BarChart;