import React, { useEffect, useRef, useState } from "react";

import { joinClassNames as classNames } from "@/utils/classNames";
import Image from "@/components/Image";

import styles from "./Pagination.module.css";
import { PaginationProps } from "./Pagination.types";
import { PAGINATION_DEFAULTS } from "./Pagination.config";

function getPageButtons(
  total: number,
  current: number,
  buttonCount: number
): (number | "ellipsis")[] {
  if (total <= 1) return [1];
  const pages: (number | "ellipsis")[] = [];
  const last = total;
  const count = Math.max(1, buttonCount);

  // Always show first, last, current, prev, next
  // Calculate range around current
  let start = Math.max(2, current - Math.floor((count - 1) / 2));
  const end = Math.min(last - 1, start + count - 1);
  if (end - start + 1 < count) {
    start = Math.max(2, end - count + 1);
  }

  // First page
  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < last - 1) pages.push("ellipsis");
  if (last > 1) pages.push(last);
  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  onPageChange,
  buttonCount = PAGINATION_DEFAULTS.buttonCount,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicButtonCount, setDynamicButtonCount] = useState(buttonCount);

  // Responsive: adjust button count based on width
  useEffect(() => {
    function updateButtonCount() {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      // Estimate: each button ~40px, ellipsis ~20px, prev/next ~40px each
      const available = Math.max(0, width - 120);
      const fit = Math.max(1, Math.floor(available / 40));
      setDynamicButtonCount(Math.min(buttonCount, fit));
    }
    updateButtonCount();
    window.addEventListener("resize", updateButtonCount);
    return () => window.removeEventListener("resize", updateButtonCount);
  }, [buttonCount]);

  const pages = getPageButtons(total, currentPage, dynamicButtonCount);

  return (
    <div
      className={classNames(styles.pagination, className)}
      ref={containerRef}
    >
      <button
        className={styles.button}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <Image
          width={12}
          height={12}
          src="/assets/images/icons/arrow_left.svg"
          alt="Previous"
        />
      </button>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={classNames(
              styles.button,
              p === currentPage ? styles.active : ""
            )}
            onClick={() => onPageChange(p as number)}
            aria-current={p === currentPage ? "page" : undefined}
            disabled={p === currentPage}
          >
            {p}
          </button>
        )
      )}
      <button
        className={styles.button}
        onClick={() => onPageChange(Math.min(total, currentPage + 1))}
        disabled={currentPage === total}
        aria-label="Next page"
      >
        <Image
          width={12}
          height={12}
          src="/assets/images/icons/arrow_right.svg"
          alt="Next"
        />
      </button>
    </div>
  );
};
