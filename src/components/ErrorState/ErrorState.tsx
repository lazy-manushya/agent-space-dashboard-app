"use client";

import Button from "@/components/Button";
import { joinClassNames } from "@/utils/classNames";

import { IErrorStateProps } from "./ErrorState.types";
import styles from "./ErrorState.module.css";

function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while loading this data. Please try again.",
  onRetry,
  className,
}: IErrorStateProps) {
  return (
    <div className={joinClassNames(styles.Container, className)}>
      <div className={styles.IconWrapper}>
        <svg
          className={styles.Icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className={styles.Title}>{title}</h3>
      <p className={styles.Message}>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className={styles.RetryButton}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
