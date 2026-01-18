"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function RoutingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ReactAriaRouterProvider navigate={router.push}>
      {children}
    </ReactAriaRouterProvider>
  );
}
