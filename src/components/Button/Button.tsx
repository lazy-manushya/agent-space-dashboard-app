"use client";

import { Button as ReactAriaButton } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import Link from "@/components/Link";

import { IButtonProps } from "./Button.types";
import styles from "./Button.module.css";
import { buttonStylesConfig } from "./Button.config";

function Button({
  children,
  className,
  variant,
  size,
  fakeDisabled,
  color,
  linkProps,
  ...restProps
}: IButtonProps) {
  const { ...filteredProps } = restProps;

  const isDisabled = restProps.disabled || false;

  if (linkProps) {
    return (
      <Link
        {...linkProps}
        isDisabled={isDisabled}
        className={joinClassNames(
          styles.Button,
          buttonStylesConfig({
            variant,
            disabled: fakeDisabled || isDisabled,
            size,
            color,
          }),
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <ReactAriaButton
      isDisabled={isDisabled}
      className={joinClassNames(
        styles.Button,
        buttonStylesConfig({
          variant,
          disabled: fakeDisabled || isDisabled,
          size,
          color,
        }),
        className
      )}
      {...filteredProps}
    >
      {children}
    </ReactAriaButton>
  );
}

export default Button;
