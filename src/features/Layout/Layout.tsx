"use client";
import { joinClassNames } from "@/utils";
import NavMenu from "@/components/NavMenu";

import { ILayoutProps } from "./Layout.types";
import styles from "./Layout.module.css";

function Layout({ children, className }: ILayoutProps) {
  return (
    <div
      className={joinClassNames(
        className,
        styles.Container
        // , styles.Debug
      )}
    >
      <header className={styles.Header}>
        <NavMenu />
      </header>
      <main className={styles.Main}>{children}</main>
    </div>
  );
}

export default Layout;
