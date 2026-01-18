import React from "react";
import { TextProps } from "react-aria-components";

export interface ITextProps extends TextProps {
  children?: React.ReactNode;
  className?: string;
}
