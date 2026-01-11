import NextLink from "next/link";
import { Link as ReactAriaLink } from "react-aria-components";

import { ILinkProps } from "./Link.types";

const USE_REACT_ARIA_LINK = true;

function Link({ href, children, ...restProps }: ILinkProps) {
  if (USE_REACT_ARIA_LINK) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <ReactAriaLink href={href} {...(restProps as any)}>
        {children}
      </ReactAriaLink>
    );
  }

  return (
    <NextLink
      href={href}
      {...restProps}
      prefetch={true}
      replace={false}
      scroll={false}
    >
      {children}
    </NextLink>
  );
}

export default Link;
