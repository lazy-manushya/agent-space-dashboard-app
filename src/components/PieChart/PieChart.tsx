import React, { useState, useMemo } from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import { PieChartProps, PieChartData } from './PieChart.types';
import styles from './PieChart.module.css';

const defaultMargin = { top: 20, right: 30, bottom: 40, left: 30 };

const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 400,
  height = 300,
  margin = defaultMargin,
  className = '',
  animate = true,
  showLabels = true,
  innerRadius = 0,
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<PieChartData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calculate total for percentage calculation
  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  // Bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  // Color scale
  const colorScale = scaleOrdinal<string, string>({
    domain: data.map((d) => d.label),
    range: data.map((d, i) => d.color || `hsl(${(i * 137.5) % 360}, 70%, 50%)`),
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

  return (
    <div className={`${styles.pieChart} ${className}`}>
      <div className={styles.chartContainer}>
        <svg width={width} height={height} className={styles.chartSvg}>
          <Group top={centerY + margin.top} left={centerX + margin.left}>
            <Pie
              data={data}
              pieValue={getValue}
              outerRadius={radius}
              innerRadius={innerRadius}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath = pie.path(arc) || '';
                  
                  return (
                    <g key={`arc-${getLabel(arc.data)}`}>
                      <path
                        d={arcPath}
                        fill={colorScale(getLabel(arc.data))}
                        className={styles.pieSlice}
                        onMouseEnter={(event) => handleSliceHover(event, arc.data)}
                        onMouseLeave={handleSliceLeave}
                      />
                      {hasSpaceForLabel && showLabels && (
                        <text
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          className={styles.pieLabel}
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
              style={{ backgroundColor: d.color || `hsl(${(i * 137.5) % 360}, 70%, 50%)` }}
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
            position: 'fixed',
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
          }}
        >
          <div><strong>{hoveredSlice.label}</strong></div>
          <div>Value: {hoveredSlice.value.toLocaleString()}</div>
          <div>Percentage: {calculatePercentage(hoveredSlice.value)}%</div>
        </div>
      )}
    </div>
  );
};

export default PieChart;