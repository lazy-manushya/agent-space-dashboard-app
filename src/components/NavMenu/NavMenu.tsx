"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useLandmark } from "react-aria";

import { joinClassNames, isPathActive } from "@/utils";
import Link from "@/components/Link";

import { INavMenuProps } from "./NavMenu.types";
import styles from "./NavMenu.module.css";

export function NavMenu({ className, navItems }: INavMenuProps) {
  const pathname = usePathname();

  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const { landmarkProps } = useLandmark(
    {
      role: "navigation",
      "aria-label": "Main navigation",
    },
    navRef
  );

  const activeIndex = useMemo(
    () => navItems.findIndex((item) => isPathActive(item.href || "", pathname)),
    [navItems, pathname]
  );

  // Update indicator position and size based on active item
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      const activeElement = itemRefs.current[activeIndex];
      if (activeElement && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeElement.getBoundingClientRect();

        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          top: itemRect.top - navRect.top,
          width: itemRect.width,
          height: itemRect.height,
        });
      }
    }
  }, [activeIndex]);

  return (
    <nav
      {...landmarkProps}
      className={joinClassNames(className, styles.Container)}
    >
      <ul ref={navRef} className={styles.NavList}>
        {activeIndex >= 0 && !!indicatorStyle && (
          <div
            className={styles.Indicator}
            style={{
              transform: `translate(${indicatorStyle.left}px, ${indicatorStyle.top}px)`,
              width: `${indicatorStyle.width}px`,
              height: `${indicatorStyle.height}px`,
              pointerEvents: "none",
            }}
          />
        )}
        {navItems.map((item, index) => {
          const isActive = isPathActive(item.href || "", pathname);
          return (
            <li
              key={item.href}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={joinClassNames(
                styles.NavItem,
                isActive ? styles.Active : ""
              )}
            >
              <Link href={item.href || "#"} className={styles.NavLink}>
                {item.icon && <span className={styles.Icon}>{item.icon}</span>}
                <span className={styles.Title}>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavMenu;
