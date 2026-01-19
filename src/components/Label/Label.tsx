"use client";

import { Label as ReactAriaLabel } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";

import { ILabelProps } from "./Label.types";
import styles from "./Label.module.css";

function Label({ children, className, ...props }: ILabelProps) {
  return (
    <ReactAriaLabel
      className={joinClassNames(styles.Label, className)}
      {...props}
    >
      {children}
    </ReactAriaLabel>
  );
}

export default Label;
