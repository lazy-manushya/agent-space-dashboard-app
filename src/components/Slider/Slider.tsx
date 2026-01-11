import {
  Label,
  Slider as ReactAriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";
import isArray from "lodash/isArray";
import TextField from "@/components/TextField";
import { ISliderProps } from "./Slider.types";
import styles from "./Slider.module.css";
import { joinClassNames } from "@/utils/classNames";
import React, { useRef, useLayoutEffect, useState, useCallback } from "react";

function BarWithCount({
  x,
  y,
  width,
  height,
  fill,
  count,
  showCount,
  isInRange,
}: // viewBoxHeight,
{
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  count: number;
  showCount: boolean;
  isInRange: boolean;
  viewBoxHeight: number;
}) {
  // Invert color: white on primary, purple on gray
  const textColor = isInRange ? "#fff" : "#6c3cff";
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={1.5} fill={fill} />
      {showCount && height > 8 && (
        <text
          x={x + width / 2}
          y={y + 8}
          textAnchor="middle"
          fontSize="7"
          fill={textColor}
          style={{ pointerEvents: "none", userSelect: "none" }}
          fontFamily="inherit"
        >
          {count}
        </text>
      )}
    </g>
  );
}

function Slider<T extends number | number[]>({
  className,
  label,
  thumbLabels,
  valueRender,
  slidersConfig = [],
  barGraph,
  dummyBarCount,
  showBarCounts = false,
  ...props
}: ISliderProps<T> & { showBarCounts?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgWidth, setSvgWidth] = useState(100);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      setSvgWidth(
        containerRef.current?.offsetWidth
          ? containerRef.current?.offsetWidth - 64
          : 100
      );
    };
    updateWidth();
    const resizeObserver = new window.ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const renderBarGraph = useCallback(() => {
    // If dummyBarCount is set, generate dummy bars at equal intervals
    let bars = barGraph?.bars || [];
    let maxCount = barGraph?.maxCount;
    const min = typeof props.minValue === "number" ? props.minValue : 0;
    const max = typeof props.maxValue === "number" ? props.maxValue : 100;
    const range = max - min;
    // svgHeight is the pixel height of the SVG. The viewBox height is always 32 for aspect ratio.
    const svgHeight = 32;
    const viewBoxHeight = 32;

    if (dummyBarCount && dummyBarCount > 0) {
      // Bell-curve-like random distribution using Box-Muller transform
      const mean = 0.5;
      const stddev = 0.18;
      const minCount = 0,
        minHeight = 0;
      let maxCount = 20;
      bars = Array.from({ length: dummyBarCount }).map((_, i) => {
        const value = min + (i * range) / (dummyBarCount - 1);
        // Normalized x in [0,1]
        const x = i / (dummyBarCount - 1);
        // Bell curve: Gaussian centered at mean, with stddev
        const bell = Math.exp(-0.5 * Math.pow((x - mean) / stddev, 2));
        // Add some randomness
        const randomFactor = 0.7 + Math.random() * 0.6; // [0.7, 1.3]
        // Scale bell to [minCount, maxCount]
        let count = Math.round(
          Math.max(minCount, Math.min(maxCount, bell * maxCount * randomFactor))
        );
        // Enforce a minimum height for the bar (as count)
        if (count < minHeight) count = minHeight;
        return { value, count };
      });
      maxCount = Math.max(...bars.map((b) => b.count), 1);
    }

    // Determine selected range from slider value (support both single and range sliders)
    let selectedMin = min,
      selectedMax = max;
    if (Array.isArray(props.value) && props.value.length === 2) {
      selectedMin = Math.min(props.value[0], props.value[1]);
      selectedMax = Math.max(props.value[0], props.value[1]);
    } else if (typeof props.value === "number") {
      selectedMin = selectedMax = props.value;
    }

    // Bar width: fill the entire slider width with all bars, spaced equally
    const n = bars.length;
    const barWidth = svgWidth / (n + 1);
    if (!bars.length) return null;
    maxCount = maxCount || Math.max(...bars.map((b) => b.count), 1);
    return (
      <svg
        className={styles.SliderBarGraph}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${viewBoxHeight}`}
        style={{ display: "block", marginBottom: 8 }}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {bars.map((bar, i) => {
          const x = barWidth / 2 + i * barWidth;
          let height = bar.count
            ? (bar.count / maxCount) * (viewBoxHeight - 4)
            : 0;
          height = bar.count > 0 ? Math.max(Math.ceil(height), 10) : 0;
          const isInRange =
            bar.value >= selectedMin && bar.value <= selectedMax;
          const fill = isInRange ? "rgb(var(--clr-primary-rgb))" : "#d4c5ff";
          return (
            <BarWithCount
              key={i}
              x={x}
              y={viewBoxHeight - height}
              width={barWidth * 0.8}
              height={height}
              fill={fill}
              count={bar.count}
              showCount={showBarCounts}
              isInRange={isInRange}
              viewBoxHeight={viewBoxHeight}
            />
          );
        })}
      </svg>
    );
  }, [
    barGraph?.bars,
    barGraph?.maxCount,
    dummyBarCount,
    props.maxValue,
    props.minValue,
    props.value,
    showBarCounts,
    svgWidth,
  ]);

  return (
    <div
      ref={containerRef}
      className={joinClassNames(styles.Container, className)}
    >
      {renderBarGraph()}
      <ReactAriaSlider<T>
        {...props}
        className={styles.Slider}
        aria-labelledby="Slider"
      >
        {label && <Label className={styles.SliderLabel}>{label}</Label>}

        <SliderTrack className={styles.SliderTrack}>
          {({ state }) => (
            <>
              <div
                className={styles.SliderTrackFill}
                style={{
                  width:
                    state.values.length === 1
                      ? state.getThumbPercent(0) * 100 + "%"
                      : (state.getThumbPercent(1) - state.getThumbPercent(0)) *
                          100 +
                        "%",
                  left:
                    state.values.length === 1
                      ? 0
                      : state.getThumbPercent(0) * 100 + "%",
                }}
              />
              {state.values.map((_, i) => (
                <SliderThumb
                  key={i}
                  index={i}
                  aria-label={thumbLabels?.[i]}
                  className={styles.SliderThumb}
                >
                  <SliderOutput className={styles.SliderOutput}>
                    {valueRender
                      ? valueRender({ value: state.getThumbValueLabel(i) })
                      : state.getThumbValueLabel(i)}
                  </SliderOutput>
                </SliderThumb>
              ))}
            </>
          )}
        </SliderTrack>
      </ReactAriaSlider>
      {!!slidersConfig?.length && (
        <div className={styles.InputContainers}>
          {slidersConfig.map((slider, index) => {
            const value = isArray(props.value)
              ? props.value?.[index]
              : props.value;
            return (
              <TextField
                {...slider.inputProps}
                key={slider.id}
                className={styles.Input}
                value={value !== undefined ? String(value) : ""}
                onChange={(value) => {
                  if (props.onChange) {
                    const updatedValue = isArray(props.value)
                      ? ([...props.value] as number[])
                      : [props.value as number];
                    updatedValue[index] = Number(value);
                    const returnValue = isArray(props.value)
                      ? (updatedValue as T)
                      : (updatedValue[0] as T);
                    props.onChange(returnValue);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Slider;
