import React from "react";
import { VariantProps } from "class-variance-authority";

import { statCardStylesConfig } from "./StatCard.config";

export interface StatCardProps extends VariantProps<typeof statCardStylesConfig> {
  className?: string;
  primaryContent: React.ReactNode;
  secondaryContent?: React.ReactNode;
  isLoading?: boolean;
  color?: string;
  icon?: React.ReactNode;
}