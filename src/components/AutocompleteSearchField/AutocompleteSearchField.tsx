"use client";

import {
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

import { IAutocompleteSearchFieldProps } from "./AutocompleteSearchField.types";
import styles from "./AutocompleteSearchField.module.css";

function AutocompleteSearchField<T extends { id: string; label: string }>({
  label,
  placeholder,
  items,
  onSelectionChange,
  className,
  "aria-label": ariaLabel,
}: IAutocompleteSearchFieldProps<T>) {
  return (
    <ComboBox
      className={className}
      aria-label={ariaLabel || label || "Search Field"}
      onSelectionChange={onSelectionChange}
      menuTrigger="focus"
    >
      {label && <Label className={styles.Label}>{label}</Label>}
      <div className={styles.InputWrapper}>
        <Input
          className={styles.Input}
          placeholder={placeholder || "Search..."}
        />
      </div>
      <Popover className={styles.Popover} offset={8}>
        <ListBox className={styles.ListBox} items={items}>
          {(item) => (
            <ListBoxItem
              key={item.id}
              id={item.id}
              textValue={item.label}
              className={styles.ListBoxItem}
            >
              {item.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

export default AutocompleteSearchField;
