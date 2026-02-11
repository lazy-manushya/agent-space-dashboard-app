import { joinClassNames } from "@/utils";

import { ITableProps } from "./Table.types";
import styles from "./ExampleComponent.module.css";

function Table({ className }: ITableProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
      Example Component
    </div>
  );
}

export default Table;
