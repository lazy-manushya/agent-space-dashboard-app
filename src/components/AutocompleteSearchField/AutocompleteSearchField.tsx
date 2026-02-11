"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Header,
  Popover,
} from "react-aria-components";

import {
  IAutocompleteSearchFieldProps,
  GroupedAutocompleteItem,
} from "./AutocompleteSearchField.types";
import styles from "./AutocompleteSearchField.module.css";

function calculateRelevanceScore(label: string, searchTerm: string): number {
  const lowerLabel = label.toLowerCase();
  const lowerSearch = searchTerm.toLowerCase();

  const parts = label.split(" - ");
  const beNumber = parts[0] || "";
  const lowerBeNumber = beNumber.toLowerCase();
  const dateString = parts[parts.length - 1] || "";

  if (lowerLabel === lowerSearch) {
    return 1000;
  }

  if (lowerBeNumber.startsWith(lowerSearch)) {
    const dateBoost = getDateBoost(dateString);
    return 500 + dateBoost;
  }

  if (lowerBeNumber.includes(lowerSearch)) {
    const dateBoost = getDateBoost(dateString);
    return 300 + dateBoost;
  }

  if (lowerLabel.includes(lowerSearch)) {
    const dateBoost = getDateBoost(dateString);
    return 100 + dateBoost;
  }

  return 0;
}

function getDateBoost(dateString: string): number {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 0;
    }

    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return 50;
    if (diffDays <= 90) return 30;
    if (diffDays <= 180) return 15;
    return 5;
  } catch {
    return 0;
  }
}

function AutocompleteSearchField<T extends GroupedAutocompleteItem>({
  label,
  placeholder,
  items,
  onSelectionChange,
  className,
  "aria-label": ariaLabel,
  groupLabelConfig,
}: IAutocompleteSearchFieldProps<T>) {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const [InputValue, setInputValue] = React.useState("");

  // Group and filter items
  const filterItems = React.useMemo((): {
    groups: Record<string, T[]>;
    ungrouped: T[];
  } => {
    if (!InputValue.trim()) {
      return { groups: {}, ungrouped: [] };
    }
    const lowerInput = InputValue.toLowerCase();
    // Filter and sort
    const filtered = items.filter((item) => {
      return item.label.toLowerCase().includes(lowerInput);
    });
    const sorted = filtered.sort((a, b) => {
      const scoreA = calculateRelevanceScore(a.label, InputValue);
      const scoreB = calculateRelevanceScore(b.label, InputValue);
      return scoreB - scoreA;
    });
    // Group by groupLabel (string[])
    const groups: Record<string, T[]> = {};
    const ungrouped: T[] = [];
    sorted.forEach((item) => {
      if (item.groupLabel) {
        if (Array.isArray(item.groupLabel)) {
          if (item.groupLabel.length > 0) {
            item.groupLabel.forEach((group) => {
              if (!groups[group]) groups[group] = [];
              groups[group].push(item);
            });
          } else {
            ungrouped.push(item);
          }
        } else if (
          typeof item.groupLabel === "string" &&
          item.groupLabel.trim() !== ""
        ) {
          if (!groups[item.groupLabel]) groups[item.groupLabel] = [];
          groups[item.groupLabel].push(item);
        } else {
          ungrouped.push(item);
        }
      } else {
        ungrouped.push(item);
      }
    });
    return { groups, ungrouped };
  }, [items, InputValue]);

  console.log("Filtered Items:", { filterItems, items });

  useEffect(() => {
    if (inputWrapperRef.current) {
      const { width } = inputWrapperRef.current.getBoundingClientRect();
      setInputWidth(width);
    }
  }, []);

  // Ensure aria-label is always a string or undefined
  const comboBoxAriaLabel =
    typeof ariaLabel === "string"
      ? ariaLabel
      : typeof label === "string"
        ? label
        : "Search Field";

  return (
    <ComboBox
      className={className}
      aria-label={comboBoxAriaLabel}
      onSelectionChange={onSelectionChange}
      menuTrigger="focus"
      inputValue={InputValue}
      onInputChange={setInputValue}
    >
      {label && <Label className={styles.Label}>{label}</Label>}
      <div ref={inputWrapperRef} className={styles.InputWrapper}>
        <Input
          className={styles.Input}
          placeholder={placeholder || "Search..."}
        />
      </div>

      {!!InputValue && (
        <Popover
          className={styles.Popover}
          offset={8}
          style={{ width: `${inputWidth}px` }}
        >
          <ListBox className={styles.ListBox}>
            {/* Render ungrouped items first */}
            {filterItems.ungrouped.map((item: T) => (
              <ListBoxItem
                key={item.id}
                id={item.id}
                textValue={item.label}
                className={styles.ListBoxItem}
              >
                {item.label}
              </ListBoxItem>
            ))}
            {/* Render grouped items using ListBoxSection and Header */}
            {Object.entries(filterItems.groups).map(
              ([groupLabel, groupItems]: [string, T[]]) => {
                const config = groupLabelConfig?.[groupLabel];
                const displayLabel = config?.label || groupLabel;
                return (
                  <ListBoxSection key={groupLabel}>
                    <Header className={styles.ListBoxHeader}>{displayLabel}</Header>
                    {groupItems.map((item: T) => (
                      <ListBoxItem
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                        className={styles.ListBoxItem}
                      >
                        {item.label}
                      </ListBoxItem>
                    ))}
                  </ListBoxSection>
                );
              },
            )}
          </ListBox>
        </Popover>
      )}
    </ComboBox>
  );
}

export default AutocompleteSearchField;
