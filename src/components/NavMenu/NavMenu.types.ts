import { ReactNode } from "react";

export interface INavItem {
  title: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
}

export interface INavMenuProps {
  className?: string;
  navItems: INavItem[];
}
