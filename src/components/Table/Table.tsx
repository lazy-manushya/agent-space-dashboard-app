import { useMemo, useCallback, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import useElementDimentions from "./hooks/useElementDimentions";
import {
  CellContentAlignment,
  CellContentVerticalAlignment,
  ITableProps,
} from "./Table.types";
import { ConvertToColumnDefs } from "./Table.utils";
import styles from "./Table.module.css";
import { joinClassNames } from "@/utils/classNames";

function Table<T>({
  columns: columnsFromProps,
  data,
  className,
  fullWidth = true,
}: ITableProps<T>) {
  const columns = useMemo(
    () =>
      columnsFromProps
        .map((c) => ({ ...c, enableSorting: c.enableSorting || false }))
        .sort(function (a, b) {
          return +!!b.fixed - +!!a.fixed;
        })
        .map(ConvertToColumnDefs),
    [columnsFromProps],
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const [tableRef, setTableRef] = useState<HTMLTableElement | null>(null);
  const { width } = useElementDimentions(tableRef);

  const isColumnWidthAuto = useCallback((column: ColumnDef<T, unknown>) => {
    return column.size === undefined && column.maxSize === undefined;
  }, []);

  return (
    <table
      ref={setTableRef}
      className={joinClassNames(styles.table, className)}
      style={
        {
          display: fullWidth ? "flex" : "inline-flex",
          "--table-visible-width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <thead className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className={styles.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const columnData: any = header.column.columnDef;
              const cellWidth = header.getSize();
              const cellWidthInRem = `${+cellWidth / 16}rem`;

              const verticalAlignment: CellContentVerticalAlignment =
                columnData.verticalAlignment;
              const alignment: CellContentAlignment = columnData.alignment;
              const alignmentStyles: React.CSSProperties = {};

              if (
                verticalAlignment === "bottom" ||
                verticalAlignment === "middle"
              ) {
                alignmentStyles.display = "flex";
                alignmentStyles.alignItems =
                  verticalAlignment === "middle" ? "center" : "flex-end";
              }

              if (alignment === "center") {
                alignmentStyles.justifyContent = "center";
              }

              const resizable: boolean = columnData.resizable;
              const canSort = header.column.getCanSort();
              const sortType = header.column.getIsSorted() as string;
              const sortIcon =
                sortType === "asc"
                  ? "sort_asc.svg"
                  : sortType === "desc"
                    ? "sort_dsc.svg"
                    : "sort_none.svg";
              const sortIconSize =
                sortType === "asc"
                  ? "0.725rem"
                  : sortType === "desc"
                    ? "0.725rem"
                    : "";

              return (
                <th
                  className={styles.th}
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    width: cellWidthInRem,
                    minWidth: cellWidthInRem,
                    flexGrow: isColumnWidthAuto(header.column.columnDef)
                      ? "1"
                      : "1",
                    textAlign: columnData.alignment,
                    ...(columnData.fixed && {
                      position: "sticky",
                      left: 0,
                      zIndex: 3,
                    }),
                    cursor: canSort ? "pointer" : "",
                    alignItems: "center",
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      width: "100%",
                      textAlign: "left",
                      ...alignmentStyles,
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>

                    {canSort && (
                      <span className={styles.iconContainer} key={sortType}>
                        {/* <Image
                          isSrcRelative
                          src={sortIcon}
                          size="xs"
                          colorVariant="gray"
                          customSize={sortIconSize}
                        /> */}
                      </span>
                    )}

                    {resizable && (
                      <span
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={joinClassNames(
                          styles.columnResizer,
                          header.column.getIsResizing() && styles.isResizing,
                        )}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody className={styles.tbody}>
        {table.getRowModel().rows.map((row) => (
          <tr className={styles.tr} key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const cellWidth = cell.column.getSize();
              const cellWidthInRem = `${+cellWidth / 16}rem`;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const columnData: any = cell.column.columnDef;

              const verticalAlignment: CellContentVerticalAlignment =
                columnData.verticalAlignment;
              const alignment: CellContentAlignment = columnData.alignment;
              const alignmentStyles: React.CSSProperties = {};

              if (
                verticalAlignment === "bottom" ||
                verticalAlignment === "middle"
              ) {
                alignmentStyles.display = "flex";
                alignmentStyles.alignItems =
                  verticalAlignment === "middle" ? "center" : "flex-end";
              }

              if (alignment === "center") {
                alignmentStyles.justifyContent = "center";
              }

              const fixed: boolean = columnData.fixed;

              return (
                <td
                  className={styles.td}
                  key={cell.id}
                  style={{
                    width: cellWidthInRem,
                    minWidth: cellWidthInRem,
                    flexGrow: isColumnWidthAuto(cell.column.columnDef)
                      ? "1"
                      : "1",
                    textAlign: columnData.alignment,
                    ...(fixed && {
                      position: "sticky",
                      left: 0,
                      zIndex: 3,
                    }),
                    ...alignmentStyles,
                  }}
                >
                  <span className={styles.cellContent}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
