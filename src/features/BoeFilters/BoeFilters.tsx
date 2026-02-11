import React from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import FieldGroup from "@/components/FieldGroup";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Label from "@/components/Label";
import DateRangePicker from "@/components/DateRangePicker";
import styles from "./BoeFilters.module.css";

export interface ColumnCategory {
  label: string;
  icon: React.ReactNode;
  columns: readonly string[];
}

export interface BoeFiltersProps {
  searchTerm: string;
  minYear: string | number;
  maxYear: string | number;
  minGWeight: string | number;
  maxGWeight: string | number;
  minExRate: string | number;
  maxExRate: string | number;
  port: string;
  invoices: string | number;
  startDate: string;
  endDate: string;
  metadata: any;
  metadataLoading: boolean;
  metadataError: string | null;
  visibleColumns: Record<string, boolean>;
  expandedCategories: Record<string, boolean>;
  columnCategories: Record<string, ColumnCategory>;
  onChange: (fields: Partial<Omit<BoeFiltersProps, "metadata"|"metadataLoading"|"metadataError"|"visibleColumns"|"expandedCategories"|"columnCategories"|"onChange">>) => void;
  onClear: () => void;
  onToggleColumn: (columnKey: string) => void;
  onToggleCategory: (category: string) => void;
  onToggleCategoryColumns: (categoryKey: string, checked: boolean) => void;
  isCategoryFullyVisible: (categoryKey: string) => boolean;
}

const BoeFilters: React.FC<BoeFiltersProps> = ({
  searchTerm,
  minYear,
  maxYear,
  minGWeight,
  maxGWeight,
  minExRate,
  maxExRate,
  port,
  invoices,
  startDate,
  endDate,
  metadata,
  metadataLoading,
  metadataError,
  visibleColumns,
  expandedCategories,
  columnCategories,
  onChange,
  onClear,
  onToggleColumn,
  onToggleCategory,
  onToggleCategoryColumns,
  isCategoryFullyVisible,
}) => {
  return (
    <div className={styles.FilterSection}>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="search-box">Search:</Label>
        <TextField
          className={styles.SearchInput}
          id="search-box"
          type="text"
          placeholder="Search by BE No, IEC No, or GST No..."
          value={searchTerm}
          onChange={(value) => onChange({ searchTerm: value })}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <DateRangePicker
          label="Date Range"
          value={{
            start: startDate || null,
            end: endDate || null,
          }}
          onChange={(value) =>
            onChange({
              startDate: value.start ? value.start.toString() : "",
              endDate: value.end ? value.end.toString() : "",
            })
          }
          aria-label="Select date range for filtering"
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Min Year:</Label>
        <Select
          label="Min Year"
          aria-label="Select minimum year filter"
          placeholder="All Years"
          value={minYear}
          onChange={(value) => onChange({ minYear: value })}
          items={[
            { label: "All Years", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading years...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading years", value: "error" }]
              : (metadata?.years || []).map((year: string | number) => ({
                  label: String(year),
                  value: String(year),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Max Year:</Label>
        <Select
          label="Max Year"
          aria-label="Select maximum year filter"
          placeholder="All Years"
          value={maxYear}
          onChange={(value) => onChange({ maxYear: value })}
          items={[
            { label: "All Years", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading years...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading years", value: "error" }]
              : (metadata?.years || []).map((year: string | number) => ({
                  label: String(year),
                  value: String(year),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Min Gross Weight:</Label>
        <Select
          label="Min Gross Weight"
          aria-label="Select minimum gross weight filter"
          placeholder="All Gross Weights"
          value={minGWeight}
          onChange={(value) => onChange({ minGWeight: value })}
          items={[
            { label: "All Gross Weights", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Gross Weights...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading Gross Weights", value: "error" }]
              : (metadata?.grossWeights || []).map((grossWeight: string | number) => ({
                  label: String(grossWeight),
                  value: String(grossWeight),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Max Gross Weight:</Label>
        <Select
          label="Max Gross Weight"
          aria-label="Select maximum gross weight filter"
          placeholder="All Gross Weights"
          value={maxGWeight}
          onChange={(value) => onChange({ maxGWeight: value })}
          items={[
            { label: "All Gross Weights", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Gross Weights...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading Gross Weights", value: "error" }]
              : (metadata?.grossWeights || []).map((grossWeight: string | number) => ({
                  label: String(grossWeight),
                  value: String(grossWeight),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Min Exchange Rate:</Label>
        <Select
          label="Min Exchange Rate"
          aria-label="Select minimum exchange rate filter"
          placeholder="All Exchange Rates"
          value={minExRate}
          onChange={(value) => onChange({ minExRate: value })}
          items={[
            { label: "All Exchange Rates", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Exchange Rates...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading Exchange Rates", value: "error" }]
              : (metadata?.exchangeRates || []).map((exchangeRate: string | number) => ({
                  label: String(exchangeRate),
                  value: String(exchangeRate),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Max Exchange Rate:</Label>
        <Select
          label="Max Exchange Rate"
          aria-label="Select maximum exchange rate filter"
          placeholder="All Exchange Rates"
          value={maxExRate}
          onChange={(value) => onChange({ maxExRate: value })}
          items={[
            { label: "All Exchange Rates", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Exchange Rates...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading Exchange Rates", value: "error" }]
              : (metadata?.exchangeRates || []).map((exchangeRate: string | number) => ({
                  label: String(exchangeRate),
                  value: String(exchangeRate),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Port Code:</Label>
        <Select
          label="Port Code"
          aria-label="Select port code filter"
          placeholder="All Ports"
          value={port}
          onChange={(value) => onChange({ port: value })}
          items={[
            { label: "All Ports", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading ports...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading ports", value: "error" }]
              : (metadata?.portCodes || []).map((port: string) => ({
                  label: String(port),
                  value: String(port),
                }))),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label>Invoices:</Label>
        <Select
          label="Invoices"
          aria-label="Select invoices filter"
          placeholder="All Invoices"
          value={invoices}
          onChange={(value) => onChange({ invoices: value })}
          items={[
            { label: "All Invoices", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Invoices...", value: "loading" }]
              : metadataError
              ? [{ label: "Error loading invoices", value: "error" }]
              : (metadata?.invoices || []).map((invoice: string | number) => ({
                  label: String(invoice),
                  value: String(invoice),
                }))),
          ]}
        />
      </FieldGroup>
      <Button
        onClick={onClear}
        size={"sm"}
        className={styles.ClearButton}
      >
        Clear Filters
      </Button>
      <div className={styles.ColumnToggleSection}>
        <Label>Column Visibility:</Label>
        <div className={styles.ColumnToggleButtons}>
          <Button onClick={() => onChange({ showCore: true })} size="sm" variant="secondary">
            Core Columns
          </Button>
          <Button onClick={() => onChange({ showAll: true })} size="sm" variant="secondary">
            All Columns
          </Button>
        </div>
        <div className={styles.ColumnToggles}>
          {Object.entries(columnCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className={styles.CategoryGroup}>
              <div
                className={styles.CategoryHeader}
                onClick={() => onToggleCategory(categoryKey)}
              >
                <span className={styles.CategoryIcon}>
                  {expandedCategories[categoryKey] ? <IoChevronDown /> : <IoChevronForward />}
                </span>
                <span className={styles.CategoryEmoji}>{category.icon}</span>
                <span className={styles.CategoryLabel}>{category.label}</span>
                <input
                  type="checkbox"
                  checked={isCategoryFullyVisible(categoryKey)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleCategoryColumns(categoryKey, e.target.checked);
                  }}
                  className={styles.CategoryCheckbox}
                />
              </div>
              {expandedCategories[categoryKey] && (
                <div className={styles.CategoryColumns}>
                  {category.columns.map((columnKey) => (
                    <label key={columnKey} className={styles.ColumnToggle}>
                      <input
                        type="checkbox"
                        checked={visibleColumns[columnKey]}
                        onChange={() => onToggleColumn(columnKey)}
                      />
                      <span>{columnKey.replace(/_/g, " ").toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoeFilters;
