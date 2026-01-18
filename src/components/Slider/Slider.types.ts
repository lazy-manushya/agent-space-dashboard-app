import { ReactNode } from "react";
import { SliderProps } from "react-aria-components";

import { ITextFieldProps } from "../TextField";


export interface ISliderBarGraph {
  /**
   * Array of { value: number, count: number } for each bar in the graph.
   * value: the value/position on the slider, count: how many for that value
   */
  bars: { value: number; count: number }[];
  /**
   * Maximum count for scaling bar heights (optional, will use max in bars if not provided)
   */
  maxCount?: number;
}

export interface ISliderProps<T = number | number[]>
  extends Omit<SliderProps<T>, "className"> {
  label?: string;
  thumbLabels?: string[];
  className?: string;
  valueRender?: (data: { value: string }) => ReactNode;
  slidersConfig?: {
    id: string;
    inputProps?: ITextFieldProps;
  }[];
  /**
   * Optional bar graph data for Airbnb-style histogram above the slider
   */
  barGraph?: ISliderBarGraph;
  /**
   * If set, generates dummy bars at equal intervals for demo/testing
   */
  dummyBarCount?: number;
}
