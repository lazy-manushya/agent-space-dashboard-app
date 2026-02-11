import { ColumnDef } from "@tanstack/table-core";
import isString from "lodash/isString";
import isFunction from "lodash/isFunction";

import { Column } from "./Table.types";

export function ConvertToColumnDefs<T>({
  id,
  accessor,
  columns = [],
  header,
  cell,
  size,
  minSize,
  maxSize,
  ...rest
}: Column<T>): ColumnDef<T> {
  const column: ColumnDef<T> = {
    id,

    ...(isString(accessor)
      ? { accessorKey: accessor }
      : isFunction(accessor)
      ? { accessorFn: accessor }
      : { accessorKey: id }),

    columns: columns.map(ConvertToColumnDefs),

    ...(header !== undefined && { header }),
    ...(cell !== undefined && { cell }),

    size,
    minSize,
    maxSize,
    ...rest,
  };

  return column;
}
