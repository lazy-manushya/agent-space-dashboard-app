"use client";

import React from "react";
import { createPortal } from "react-dom";

import { IS_BROWSER } from "@/config/app";

import { IPortalProps } from "./Portal.types";

const Portal: React.FC<IPortalProps> = ({
  children,
  container = IS_BROWSER ? window.document.body : null,
}) => {
  if (!container) {
    return children;
  }

  return createPortal(<>{children}</>, container);
};

export default Portal;
