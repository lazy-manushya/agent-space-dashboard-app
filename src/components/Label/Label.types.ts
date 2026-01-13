import React from "react";
import { LabelProps } from "react-aria-components";

export interface ILabelProps extends LabelProps {
  children?: React.ReactNode;
  className?: string;
}
