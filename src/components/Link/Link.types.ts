import { AnchorHTMLAttributes } from "react";

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isDisabled?: boolean;
}
