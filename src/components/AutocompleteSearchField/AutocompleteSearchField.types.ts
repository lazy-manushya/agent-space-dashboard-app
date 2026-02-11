import React from "react";

export interface GroupedAutocompleteItem {
  id: string;
  label: string;
  groupLabel?: string | string[]; // Can be a single group or multiple groups
}

export interface IAutocompleteSearchFieldProps<
  T extends GroupedAutocompleteItem,
> {
  label?: React.ReactNode;
  placeholder?: string;
  items: T[];
  onSelectionChange?: (key: React.Key | null) => void;
  className?: string;
  "aria-label"?: string;
  groupLabelConfig?: GroupLabelConfig;
}

export interface GroupLabelConfigItem {
  label?: React.ReactNode; // Display label override
}

export type GroupLabelConfig = Record<string, GroupLabelConfigItem>;
