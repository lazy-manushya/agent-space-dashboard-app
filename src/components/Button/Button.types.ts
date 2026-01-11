import React from "react";
import { VariantProps } from "class-variance-authority";
import { ButtonProps } from "react-aria-components";

import { ILinkProps } from "@/components/Link";

import { buttonStylesConfig } from "./Button.config";

export interface IButtonProps
  extends Omit<ButtonProps, "disabled">,
    VariantProps<typeof buttonStylesConfig> {
  children?: React.ReactNode;
  className?: string;
  fakeDisabled?: boolean;
  linkProps?: ILinkProps;
}
