/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Header, Row, Table } from "@tanstack/table-core";

export type ObjectKeyAndAnyString<T> = keyof T | (string & {});

export type CellDataAccessorFn<T> = (originalRow: T, index: number) => string;

export type CellContentAlignment = "left" | "right" | "center";
export type CellContentVerticalAlignment = "top" | "middle" | "bottom";

export type CustomHeaderFn<T> = (props: {
  table: Table<T>;
  header: Header<T, any>;
  column: Column<T>;
}) => any;

export type CustomCellFn<T> = (props: {
  table: Table<T>;
  row: Row<T>;
  column: Column<T>;
  cell: Cell<T, any>;
  getValue: () => any;
  renderValue: () => any;
}) => any;

export type BuiltinSortingFncNames =
  | "alphanumeric"
  | "alphanumericCaseSensitive"
  | "text"
  | "textCaseSensitive"
  | "datetime"
  | "basic";

export type SortingFnc<T> =
  | BuiltinSortingFncNames
  | ((rowA: Row<T>, rowB: Row<T>, columnId: string) => -1 | 0 | 1);

export type Column<T> = {
  id: string;
  //----------------------
  accessor?: ObjectKeyAndAnyString<T> | CellDataAccessorFn<T>;
  columns?: Column<T>[];
  header?: string | CustomHeaderFn<T>;
  cell?: string | CustomCellFn<T>;
  size?: number;
  minSize?: number;
  maxSize?: number;
  centered?: boolean;
  alignment?: CellContentAlignment;
  fixed?: boolean;
  verticalAlignment?: CellContentVerticalAlignment;
  resizable?: boolean;
  enableSorting?: boolean;
  sortingFnc?: SortingFnc<T>;
};

export type TableData<T = object> = T & {
  subRows?: TableData<T>[];
};

export interface ITableProps<T = object> {
  data: TableData<T>[];
  columns: Column<T>[];
  //----------------------
  className?: string;
  fullWidth?: boolean;
}
