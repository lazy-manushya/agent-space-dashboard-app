"use client";

import { Text as ReactAriaText } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";

import { ITextProps } from "./Text.types";
import styles from "./Text.module.css";

function Text({ children, className, ...props }: ITextProps) {
  return (
    <ReactAriaText
      className={joinClassNames(styles.Text, className)}
      {...props}
    >
      {children}
    </ReactAriaText>
  );
}

export default Text;
