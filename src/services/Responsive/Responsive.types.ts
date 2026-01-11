export enum DEVICE_BREAKPOINT {
  fullhd = 1408,
  widescreen = 1200,
  desktop = 1023,
  smallMonitor = 992,
  tablet = 768,
  largeMobile = 460,
  mobile = 380,
  smallMobile = 324,
}

export type BREAKPOINT_NAMES =
  | "fullhd"
  | "widescreen"
  | "desktop"
  | "smallMonitor"
  | "tablet"
  | "largeMobile"
  | "mobile"
  | "smallMobile";

export interface IResponsiveContext {
  screenWidth: number;
  screenHeight: number;
  isScreenSmallerThanTablet: boolean;
  setAppCssVar: (key: string, value: string) => void;
}
