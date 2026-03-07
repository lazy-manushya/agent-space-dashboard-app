"use client";

import { joinClassNames } from "@/utils";
import NavMenu from "@/components/NavMenu";
import Logo from "@/features/Logo";
import AlertsButton from "@/features/AlertsButton";

import { ILayoutProps } from "./Layout.types";
import styles from "./Layout.module.css";

function Layout({ children, className }: ILayoutProps) {

  return (
    <div
      className={joinClassNames(
        className,
        styles.Container,
        // , styles.Debug
      )}
    >
      <div className="position-relative">
        <header className={joinClassNames(styles.Header)}>
          <div className={joinClassNames("container", styles.HeaderInner)}>
            <Logo />
            <NavMenu
              className={styles.NavMenu}
              navItems={[
                // {
                //   title: "Home",
                //   href: "/",
                //   icon: <i className="las la-home" />,
                // },
                {
                  title: "BOE",
                  href: "/boe",
                  icon: <i className="las la-book-open" />,
                },
                {
                  title: "Accounts",
                  href: "/accounts",
                  icon: <i className="las la-user" />,
                },
                {
                  title: "Duties",
                  href: "/duties",
                  icon: <i className="las la-file-invoice" />,
                },
                {
                  title: "Audit",
                  href: "/audit",
                  icon: <i className="las la-receipt" />,
                  // disabled: true,
                },
                {
                  title: "Reports",
                  href: "/reports",
                  icon: <i className="las la-chart-bar" />,
                },
                {
                  title: "AI Chat",
                  href: "/ai-chat",
                  icon: <i className="las la-robot" />,
                },
              ]}
            />
            {false && <AlertsButton />}
          </div>
        </header>
      </div>
      <main className={styles.Main}>{children}</main>
    </div>
  );
}

export default Layout;
