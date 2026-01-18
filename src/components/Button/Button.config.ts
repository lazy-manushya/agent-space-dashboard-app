import { cva } from "class-variance-authority";

import styles from "./Button.module.css";

export const buttonStylesConfig = cva(styles.Button, {
  variants: {
    variant: {
      primary: styles.ButtonPrimary,
      secondary: styles.ButtonSecondary,
      ghost: styles.ButtonGhost,
    },
    disabled: {
      true: styles.ButtonDisabled,
      false: undefined,
    },
    size: {
      sm: styles.ButtonSmall,
      md: styles.ButtonMedium,
      lg: styles.ButtonLarge,
    },
    color: {
      primary: styles.ButtonColorPrimary,
      black: styles.ButtonBlack,
      gray: styles.ButtonGray,
      red: styles.ButtonRed,
    },
  },
  defaultVariants: {
    color: "primary",
    variant: "primary",
    size: "md",
  },
});
