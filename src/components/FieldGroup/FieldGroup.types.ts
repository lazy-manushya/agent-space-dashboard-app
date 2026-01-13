import React from "react";
import { GroupProps } from "react-aria-components";

export interface IFieldGroupProps extends GroupProps {
  children?: React.ReactNode;
  className?: string;
}
