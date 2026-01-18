import React from "react";
import { VariantProps } from "class-variance-authority";

import { inputFieldStylesConfig } from "./InputField.types.config";

export interface IInputFieldProps
  extends VariantProps<typeof inputFieldStylesConfig> {
  className?: string;
  inputComponent?: React.ReactNode;
  prependContent?: React.ReactNode;
  appendContent?: React.ReactNode;
  style?: React.CSSProperties;
}
