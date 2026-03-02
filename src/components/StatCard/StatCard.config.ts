import { cva } from "class-variance-authority";

import styles from "./StatCard.module.css";

export const statCardStylesConfig = cva(styles.Stat, {
  variants: {
    size: {
      sm: styles.StatSmall,
      md: styles.StatMedium,
      lg: styles.StatLarge,
    },
  },
  defaultVariants: {
    size: "md",
  },
});