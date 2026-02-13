"use client";
import { usePathname } from "next/navigation";

import { joinClassNames } from "@/utils";
import NavMenu from "@/components/NavMenu";
import Logo from "@/features/Logo";
import AlertsButton from "@/features/AlertsButton";
import Button from "@/components/Button";

import { ILayoutProps } from "./Layout.types";
import styles from "./Layout.module.css";

const EXPORT_SUMMARY_ROUTES = ["/", "/invoices", "/duties"];

function Layout({ children, className }: ILayoutProps) {
  const pathName = usePathname();
  const showExportButton = EXPORT_SUMMARY_ROUTES.includes(pathName);

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
                {
                  title: "Home",
                  href: "/",
                  icon: <i className="las la-home" />,
                },
                {
                  title: "BOE",
                  href: "/boe",
                  icon: <i className="las la-book-open" />,
                },
                {
                  title: "Invoices",
                  href: "/invoices",
                  icon: <i className="las la-receipt" />,
                  // disabled: true,
                },
                {
                  title: "Duties",
                  href: "/duties",
                  icon: <i className="las la-file-invoice" />,
                  // disabled: true,
                },
              ]}
            />
            {false && <AlertsButton />}
            {showExportButton && (
              <Button variant="secondary">
                <i
                  className="las la-download"
                  style={{
                    fontSize: "1.25rem",
                  }}
                ></i>
                Export summary
              </Button>
            )}
          </div>
        </header>
      </div>
      <main className={styles.Main}>{children}</main>
    </div>
  );
}

export default Layout;
