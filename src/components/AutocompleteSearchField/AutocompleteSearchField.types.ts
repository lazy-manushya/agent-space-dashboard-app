import React from "react";

export interface IAutocompleteSearchFieldProps<
  T extends { id: string; label: string }
> {
  label?: React.ReactNode;
  placeholder?: string;
  items: T[];
  onSelectionChange?: (key: React.Key | null) => void;
  className?: string;
  "aria-label"?: string;
}
