import { ReactNode } from "react";

export type Column = {
  id: string;
  header: ReactNode;
  accessor?: string;
};

export interface ITableProps {
  columns: Column[];
  className?: string;
}
