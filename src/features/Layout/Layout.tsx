import { joinClassNames } from "@/utils";

import NavMenu from "@/components/NavMenu";
import Logo from "@/features/Logo";
import AlertsButton from "@/features/AlertsButton";
import Button from "@/components/Button";

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
            <Button>Export summary</Button>
          </div>
        </header>
      </div>
      <main className={styles.Main}>{children}</main>
    </div>
  );
}

export default Layout;
