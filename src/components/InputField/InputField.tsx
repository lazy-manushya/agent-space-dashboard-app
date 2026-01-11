"use client";

import { joinClassNames } from "@/utils/classNames";

import { IInputFieldProps } from "./InputField.types";
import styles from "./InputField.module.css";
import { inputFieldStylesConfig } from "./InputField.types.config";

function InputField({
  inputComponent,
  className,
  error,
  appendContent,
  prependContent,
  style,
}: IInputFieldProps) {
  return (
    <div
      className={joinClassNames(
        styles.Container,
        className,
        inputFieldStylesConfig({ error })
      )}
      style={style}
    >
      {prependContent}
      <div className={styles.InputContainer}>{inputComponent}</div>
      {appendContent}
    </div>
  );
}

export default InputField;
