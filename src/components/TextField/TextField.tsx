"use client";

import { Input, TextField as ReactAriaTextField } from "react-aria-components";

import InputField from "@/components/InputField";

import { ITextFieldProps } from "./TextField.types";
import styles from "./TextField.module.css";

function TextField({
  className,
  prependContent,
  appendContent,
  style,
  ...props
}: ITextFieldProps) {
  const ariaLabel =
    props["aria-labelledby"] ||
    props["aria-label"] ||
    props.name ||
    props.placeholder;

  return (
    <InputField
      className={className}
      error={props.error}
      prependContent={prependContent}
      appendContent={appendContent}
      style={{ ...(style || {}) }}
      inputComponent={
        <ReactAriaTextField
          aria-labelledby={ariaLabel || "Text Field"}
          {...props}
          className={styles.TextField}
        >
          <Input className={styles.Input} max={props.max} min={props.min} />
        </ReactAriaTextField>
      }
    />
  );
}

export default TextField;
