"use client";

import { TextArea as ReactAriaTextArea } from "react-aria-components";

import InputField from "@/components/InputField";
import { joinClassNames } from "@/utils/classNames";

import { ITextAreaProps } from "./TextArea.types";
import styles from "./TextArea.module.css";

function TextArea({
  className,
  prependContent,
  appendContent,
  style,
  error,
  ...props
}: ITextAreaProps) {
  const ariaLabel =
    props["aria-labelledby"] ||
    props["aria-label"] ||
    props.name ||
    props.placeholder;

  return (
    <InputField
      className={joinClassNames(styles.Container, className)}
      error={error}
      prependContent={prependContent}
      appendContent={appendContent}
      style={{ ...(style || {}) }}
      inputComponent={
        <ReactAriaTextArea
          aria-labelledby={ariaLabel}
          {...props}
          className={styles.TextArea}
        ></ReactAriaTextArea>
      }
    />
  );
}

export default TextArea;
