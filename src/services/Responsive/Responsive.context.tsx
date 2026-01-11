"use client";

import { useCallback, useEffect, useState } from "react";

import { ResponsiveContext } from "./Responsive.config";
import { DEVICE_BREAKPOINT } from "./Responsive.types";

export const ResponsiveProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [screenHeight, setScreenHeight] = useState(640);
  const [screenWidth, setScreenWidth] = useState(480);
  const isScreenSmallerThanTablet = screenWidth < DEVICE_BREAKPOINT.tablet;

  const screenListenerEvent = useCallback(() => {
    setTimeout(() => {
      const screenWidth = window.innerWidth;
      setScreenWidth(screenWidth);

      const screenHeight = window.innerHeight;
      setScreenHeight(screenHeight);

      document.body.style.setProperty("--vh", `${screenHeight / 100}px`);
      document.body.style.setProperty("--vw", `${screenWidth / 100}px`);
    }, 250);
  }, []);

  const setAppCssVar = useCallback((key: string, value: string) => {
    document.body.style.setProperty(key, value);
  }, []);

  //----------------------------

  useEffect(() => {
    screenListenerEvent();
  }, [screenListenerEvent]);

  useEffect(() => {
    window.addEventListener("resize", screenListenerEvent);

    return () => {
      window.removeEventListener("resize", screenListenerEvent);
    };
  }, [screenListenerEvent]);

  return (
    <ResponsiveContext.Provider
      value={{
        screenWidth,
        isScreenSmallerThanTablet,
        screenHeight,
        setAppCssVar,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
