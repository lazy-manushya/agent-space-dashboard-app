"use client";

import { createContext } from "react";

import { IResponsiveContext } from "./Responsive.types";

const initialValues = {} as IResponsiveContext;
export const ResponsiveContext = createContext(initialValues);
