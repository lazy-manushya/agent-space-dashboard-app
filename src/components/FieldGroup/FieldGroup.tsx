"use client";

import { Group } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";

import { IFieldGroupProps } from "./FieldGroup.types";
import styles from "./FieldGroup.module.css";

function FieldGroup({ children, className, ...props }: IFieldGroupProps) {
  return (
    <Group
      className={joinClassNames(styles.FieldGroup, className)}
      {...props}
    >
      {children}
    </Group>
  );
}

export default FieldGroup;
