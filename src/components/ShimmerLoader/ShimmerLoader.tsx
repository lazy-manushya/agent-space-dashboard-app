import React from "react";

import { joinClassNames } from "@/utils/classNames";

import {
  IShimmerLoaderCircularProps,
  IShimmerLoaderProps,
} from "./ShimmerLoader.types";
import styles from "./ShimmerLoader.module.css";

const ShimmerLoader: React.FC<IShimmerLoaderProps> = ({
  style,
  className,
  children,
}) => {
  return (
    <div style={style} className={joinClassNames(className, styles.Loader)}>
      {children}
    </div>
  );
};

export const Circular: React.FC<IShimmerLoaderCircularProps> = ({
  size = "4rem",
  style = {},
  className,
  children,
}) => {
  return (
    <div
      style={{ ...style, "--size": size } as React.CSSProperties}
      className={joinClassNames(
        className,
        styles.Loader,
        styles.CircularLoader
      )}
    >
      {children}
    </div>
  );
};

const api = {
  Default: ShimmerLoader,
  Circular,
};

export default api;
