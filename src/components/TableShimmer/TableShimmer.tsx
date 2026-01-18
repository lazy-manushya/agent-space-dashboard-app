"use client";

import ShimmerLoader from "@/components/ShimmerLoader";
import { ITableShimmerProps } from "./TableShimmer.types";
import styles from "./TableShimmer.module.css";

function TableShimmer({ rows = 10, columns = 10, className }: ITableShimmerProps) {
  return (
    <div className={styles.Container}>
      <table className={styles.Table}>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={`header-${index}`} className={styles.TableHeader}>
                <ShimmerLoader.Default style={{ height: "1.25rem", width: "100%" }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`} className={styles.TableRow}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={`cell-${rowIndex}-${colIndex}`} className={styles.TableCell}>
                  <ShimmerLoader.Default style={{ height: "1rem", width: "100%" }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableShimmer;
