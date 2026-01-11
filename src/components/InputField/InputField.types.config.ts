import { cva } from "class-variance-authority";

import styles from "./InputField.module.css";

export const inputFieldStylesConfig = cva(styles.Button, {
  variants: {
    error: {
      true: styles.Error,
      false: undefined,
    },
  },
  defaultVariants: {},
});
