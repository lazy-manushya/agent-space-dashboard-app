"use client";

import React, { useState } from "react";
import { type DateValue } from "@internationalized/date";
import {
  IoChevronDown,
  IoChevronForward,
  IoInformationCircleOutline,
  IoBusinessOutline,
  IoCubeOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { parseDate } from "@internationalized/date";

import { joinClassNames } from "@/utils";
import Card from "@/components/Card";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Label from "@/components/Label";
import FieldGroup from "@/components/FieldGroup";
import Text from "@/components/Text";
import DateRangePicker from "@/components/DateRangePicker";
import TableShimmer from "@/components/TableShimmer";
import BoeHeaderBarChart from "@/features/BoeHeaderBarChart";
import BoeHeaderPieChart from "@/features/BoeHeaderPieChart";
import Count from "@/components/Count";

import { IDashboardPageProps } from "./DashboardPage.types";
import styles from "./DashboardPage.module.css";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { useBoeHeaders } from "@/services/boe";
import { useBoeHeadersMetadata } from "@/services/boe";
import StatCard from "@/components/StatCard";
import { useQueryParamState } from "@/services/Routing";
import BoeTable from "@/features/BoeTable";

// Number formatting utilities
const formatNumber = (
  value: number | undefined,
  maxDecimals: number = 2,
): string => {
  if (value === undefined || value === null) return "-";

  // For large numbers, use compact notation
  if (value >= 1000000) {
    return (value / 1000000).toFixed(maxDecimals) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(maxDecimals) + "k";
  }

  // For regular numbers, limit decimals
  return Number(value.toFixed(maxDecimals)).toLocaleString();
};

const formatDecimal = (
  value: number | undefined,
  maxDecimals: number = 2,
): string => {
  if (value === undefined || value === null) return "-";
  return Number(value.toFixed(maxDecimals)).toLocaleString();
};

function DashboardPage({ className }: IDashboardPageProps) {
  const { values, setValues } = useQueryParamState(
    {
      searchTerm: "",
      minYear: "",
      maxYear: "",
      minGWeight: 0,
      maxGWeight: 0,
      minExRate: 0,
      maxExRate: 0,
      port: "",
      invoices: "",
      startDate: "",
      endDate: "",
    },
    {
      urlKeys: {
        searchTerm: "search",
        minYear: "min_year",
        maxYear: "max_year",
        minGWeight: "min_g_weight",
        maxGWeight: "max_g_weight",
        minExRate: "min_ex_rate",
        maxExRate: "max_ex_rate",
        startDate: "start_date",
        endDate: "end_date",
      },
    },
  );

  const {
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
  } = values;

  // Remove individual useState hooks for filters

  const [visibleColumns, setVisibleColumns] = useState({
    be_no: true,
    year: true,
    iec_no: false,
    gst_no: true,
    port_code: true,
    be_date: true,
    pkg: true,
    g_wt: true,
    ex_rate: false,
    no_of_invoices: false,
    total_items: false,
  });

  const [expandedCategories, setExpandedCategories] = useState({
    basicInfo: true,
    businessDetails: true,
    shipmentDetails: true,
    financialSummary: false,
  });

  const columnCategories = {
    basicInfo: {
      label: "Basic Information",
      icon: <IoInformationCircleOutline />,
      columns: ["be_no", "year", "be_date"] as const,
    },
    businessDetails: {
      label: "Business Details",
      icon: <IoBusinessOutline />,
      columns: ["iec_no", "gst_no", "port_code"] as const,
    },
    shipmentDetails: {
      label: "Shipment Details",
      icon: <IoCubeOutline />,
      columns: ["pkg", "g_wt"] as const,
    },
    financialSummary: {
      label: "Financial & Summary",
      icon: <IoStatsChartOutline />,
      columns: ["ex_rate", "no_of_invoices", "total_items"] as const,
    },
  };

  const toggleColumn = (columnKey: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  const toggleCategory = (category: keyof typeof expandedCategories) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleCategoryColumns = (
    categoryKey: keyof typeof columnCategories,
    checked: boolean,
  ) => {
    const category = columnCategories[categoryKey];
    const updates: Partial<typeof visibleColumns> = {};
    category.columns.forEach((col) => {
      updates[col] = checked;
    });
    setVisibleColumns((prev) => ({ ...prev, ...updates }));
  };

  const isCategoryFullyVisible = (
    categoryKey: keyof typeof columnCategories,
  ) => {
    const category = columnCategories[categoryKey];
    return category.columns.every((col) => visibleColumns[col]);
  };

  // Get the first visible column to use as row header
  const getRowHeaderColumn = (): keyof typeof visibleColumns | null => {
    const columnOrder: (keyof typeof visibleColumns)[] = [
      "be_no",
      "year",
      "iec_no",
      "gst_no",
      "port_code",
      "be_date",
      "pkg",
      "g_wt",
      "ex_rate",
      "no_of_invoices",
      "total_items",
    ];
    return columnOrder.find((col) => visibleColumns[col]) || null;
  };

  const showAllColumns = () => {
    setVisibleColumns({
      be_no: true,
      year: true,
      iec_no: true,
      gst_no: true,
      port_code: true,
      be_date: true,
      pkg: true,
      g_wt: true,
      ex_rate: true,
      no_of_invoices: true,
      total_items: true,
    });
    setExpandedCategories({
      basicInfo: true,
      businessDetails: true,
      shipmentDetails: true,
      financialSummary: true,
    });
  };

  const showCoreColumns = () => {
    setVisibleColumns({
      be_no: true,
      year: true,
      iec_no: false,
      gst_no: true,
      port_code: true,
      be_date: true,
      pkg: true,
      g_wt: true,
      ex_rate: false,
      no_of_invoices: false,
      total_items: false,
    });
    setExpandedCategories({
      basicInfo: true,
      businessDetails: true,
      shipmentDetails: true,
      financialSummary: false,
    });
  };

  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRowExpansion = (beNo: string) => {
    setExpandedRow(expandedRow === beNo ? null : beNo);
  };

  const {
    metadata,
    loading: metadataLoading,
    error: metadataError,
  } = useBoeHeadersMetadata();

  // Build filters object with year range handling and date range
  const buildFilters = () => {
    const filters: Record<string, string | number> = {};
    if (minYear) filters.min_year = minYear;
    if (maxYear) filters.max_year = maxYear;
    if (minGWeight) filters.min_g_weight = minGWeight;
    if (maxGWeight) filters.max_g_weight = maxGWeight;
    if (minExRate) filters.min_ex_rate = minExRate;
    if (maxExRate) filters.max_ex_rate = maxExRate;
    if (port) filters.port_code = port;
    if (invoices) filters.no_of_invoices = invoices;
    if (startDate) filters.start_date = startDate.toString();
    if (endDate) filters.end_date = endDate.toString();
    return filters;
  };

  const filters = buildFilters();

  const {
    data: boeHeaders,
    loading,
    error,
  } = useBoeHeaders({
    page: 1,
    limit: 100,
    search: searchTerm || undefined,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
  });

  // Unified handlers using setValues
  const handleSearch = (value: string) => {
    setValues({ searchTerm: value });
  };

  const handleMinGWeightChange = (value: string | number) => {
    setValues({ minGWeight: +value });
  };

  const handleMaxGWeightChange = (value: string | number) => {
    setValues({ maxGWeight: +value });
  };

  const handleMinYearChange = (value: string | number) => {
    setValues({ minYear: `${value}` });
  };

  const handleMaxYearChange = (value: string | number) => {
    setValues({ maxYear: `${value}` });
  };

  const handleMinExRateChange = (value: string | number) => {
    setValues({ minExRate: +value });
  };

  const handleMaxExRateChange = (value: string | number) => {
    setValues({ maxExRate: +value });
  };

  const handlePortChange = (value: string | number) => {
    setValues({ port: `${value}` });
  };

  const handleInvoicesChange = (value: string | number) => {
    setValues({ invoices: `${value}` });
  };

  const handleDateRangeChange = (value: {
    start: DateValue | null;
    end: DateValue | null;
  }) => {
    setValues({
      startDate: value.start ? value.start.toString() : "",
      endDate: value.end ? value.end.toString() : "",
    });
  };

  const handleClearFilters = () => {
    setValues({
      searchTerm: "",
      minYear: "",
      maxYear: "",
      minGWeight: 0,
      maxGWeight: 0,
      minExRate: 0,
      maxExRate: 0,
      port: "",
      invoices: "",
      startDate: "",
      endDate: "",
    });
  };

  const filtersJsx = (
    <div className={styles.FilterSection}>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="search-box">Search:</Label>
        <TextField
          className={styles.SearchInput}
          id="search-box"
          type="text"
          placeholder="Search by BE No, IEC No, or GST No..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </FieldGroup>

      <FieldGroup className={styles.FilterGroup}>
        <DateRangePicker
          label="Date Range"
          value={{
            start: startDate ? parseDate(startDate) : null,
            end: endDate ? parseDate(endDate) : null,
          }}
          onChange={handleDateRangeChange}
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
          onChange={handleMinYearChange}
          items={[
            { label: "All Years", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading years...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading years", value: "error" }]
                : (metadata?.years || []).map((year: any) => ({
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
          onChange={handleMaxYearChange}
          items={[
            { label: "All Years", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading years...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading years", value: "error" }]
                : (metadata?.years || []).map((year: any) => ({
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
          onChange={handleMinGWeightChange}
          items={[
            { label: "All Gross Weights", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Gross Weights...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading Gross Weights", value: "error" }]
                : (metadata?.grossWeights || []).map((grossWeight: any) => ({
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
          onChange={handleMaxGWeightChange}
          items={[
            { label: "All Gross Weights", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Gross Weights...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading Gross Weights", value: "error" }]
                : (metadata?.grossWeights || []).map((grossWeight: any) => ({
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
          onChange={handleMinExRateChange}
          items={[
            { label: "All Exchange Rates", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Exchange Rates...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading Exchange Rates", value: "error" }]
                : (metadata?.exchangeRates || []).map((exchangeRate: any) => ({
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
          onChange={handleMaxExRateChange}
          items={[
            { label: "All Exchange Rates", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Exchange Rates...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading Exchange Rates", value: "error" }]
                : (metadata?.exchangeRates || []).map((exchangeRate: any) => ({
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
          onChange={handlePortChange}
          items={[
            { label: "All Ports", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading ports...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading ports", value: "error" }]
                : (metadata?.portCodes || []).map((port: any) => ({
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
          onChange={handleInvoicesChange}
          items={[
            { label: "All Invoices", value: "" },
            ...(metadataLoading
              ? [{ label: "Loading Invoices...", value: "loading" }]
              : metadataError
                ? [{ label: "Error loading invoices", value: "error" }]
                : (metadata?.invoices || []).map((invoice: any) => ({
                    label: String(invoice),
                    value: String(invoice),
                  }))),
          ]}
        />
      </FieldGroup>

      <Button
        onClick={handleClearFilters}
        size={"sm"}
        className={styles.ClearButton}
      >
        Clear Filters
      </Button>

      <div className={styles.ColumnToggleSection}>
        <Label>Columns:</Label>
        <div className={styles.ColumnToggleButtons}>
          <Button onClick={showCoreColumns} size="sm" variant="secondary">
            Core Columns
          </Button>
          <Button onClick={showAllColumns} size="sm" variant="secondary">
            All Columns
          </Button>
        </div>
        <div className={styles.ColumnToggles}>
          {Object.entries(columnCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className={styles.CategoryGroup}>
              <div
                className={styles.CategoryHeader}
                onClick={() =>
                  toggleCategory(categoryKey as keyof typeof expandedCategories)
                }
              >
                <span className={styles.CategoryIcon}>
                  {expandedCategories[
                    categoryKey as keyof typeof expandedCategories
                  ] ? (
                    <IoChevronDown />
                  ) : (
                    <IoChevronForward />
                  )}
                </span>
                <span className={styles.CategoryEmoji}>{category.icon}</span>
                <span className={styles.CategoryLabel}>{category.label}</span>
                <input
                  type="checkbox"
                  checked={isCategoryFullyVisible(
                    categoryKey as keyof typeof columnCategories,
                  )}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleCategoryColumns(
                      categoryKey as keyof typeof columnCategories,
                      e.target.checked,
                    );
                  }}
                  className={styles.CategoryCheckbox}
                />
              </div>

              {expandedCategories[
                categoryKey as keyof typeof expandedCategories
              ] && (
                <div className={styles.CategoryColumns}>
                  {category.columns.map((columnKey) => (
                    <label key={columnKey} className={styles.ColumnToggle}>
                      <input
                        type="checkbox"
                        checked={visibleColumns[columnKey]}
                        onChange={() => toggleColumn(columnKey)}
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

  const tableJsx = (
    <div className={styles.SubContainer}>
      {loading && <TableShimmer rows={10} columns={11} />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      {!loading && !error && boeHeaders.length > 0 && (
        <Table className={styles.Table}>
          <TableHeader>
            {visibleColumns.be_no && (
              <Column isRowHeader={getRowHeaderColumn() === "be_no"}>
                <span>BE No</span>
              </Column>
            )}
            {visibleColumns.year && (
              <Column isRowHeader={getRowHeaderColumn() === "year"}>
                <span>Year</span>
              </Column>
            )}
            {visibleColumns.iec_no && (
              <Column isRowHeader={getRowHeaderColumn() === "iec_no"}>
                <span>IEC No</span>
              </Column>
            )}
            {visibleColumns.gst_no && (
              <Column isRowHeader={getRowHeaderColumn() === "gst_no"}>
                <span>GST No</span>
              </Column>
            )}
            {visibleColumns.port_code && (
              <Column isRowHeader={getRowHeaderColumn() === "port_code"}>
                <span>Port Code</span>
              </Column>
            )}
            {visibleColumns.be_date && (
              <Column isRowHeader={getRowHeaderColumn() === "be_date"}>
                <span>BE Date</span>
              </Column>
            )}
            {visibleColumns.pkg && (
              <Column isRowHeader={getRowHeaderColumn() === "pkg"}>
                <span>Packages</span>
              </Column>
            )}
            {visibleColumns.g_wt && (
              <Column isRowHeader={getRowHeaderColumn() === "g_wt"}>
                <span>Gross Weight</span>
              </Column>
            )}
            {visibleColumns.ex_rate && (
              <Column isRowHeader={getRowHeaderColumn() === "ex_rate"}>
                <span>Exchange Rate</span>
              </Column>
            )}
            {visibleColumns.no_of_invoices && (
              <Column isRowHeader={getRowHeaderColumn() === "no_of_invoices"}>
                <span>Invoices</span>
              </Column>
            )}
            {visibleColumns.total_items && (
              <Column isRowHeader={getRowHeaderColumn() === "total_items"}>
                <span>Items</span>
              </Column>
            )}
          </TableHeader>
          <TableBody>
            {boeHeaders.map((header) => {
              const isExpanded = expandedRow === header.be_no;
              return (
                <React.Fragment key={header.be_no}>
                  <Row
                    className={styles.ClickableRow}
                    onAction={() => toggleRowExpansion(header.be_no)}
                  >
                    {visibleColumns.be_no && (
                      <Cell className={styles.Cell}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span className={styles.ExpandIcon}>
                            {isExpanded ? "▼" : "▶"}
                          </span>
                          <span
                            className={`${styles.BeNumber} ${styles.PrimaryData}`}
                          >
                            {header.be_no}
                          </span>
                        </div>
                      </Cell>
                    )}
                    {visibleColumns.year && (
                      <Cell className={styles.Cell}>
                        <span className={styles.MetaInfo}>{header.year}</span>
                      </Cell>
                    )}
                    {visibleColumns.iec_no && (
                      <Cell className={styles.Cell}>
                        <span className={styles.MetaInfo}>{header.iec_no}</span>
                      </Cell>
                    )}
                    {visibleColumns.gst_no && (
                      <Cell className={styles.Cell}>
                        <span className={styles.MetaInfo}>{header.gst_no}</span>
                      </Cell>
                    )}
                    {visibleColumns.port_code && (
                      <Cell className={styles.Cell}>
                        <span
                          className={`${styles.PortBadge} ${styles[header.port_code?.toLowerCase()]} ${styles.PrimaryData}`}
                        >
                          {header.port_code}
                        </span>
                      </Cell>
                    )}
                    {visibleColumns.be_date && (
                      <Cell className={styles.Cell}>
                        <span className={styles.SecondaryData}>
                          {header.be_date}
                        </span>
                      </Cell>
                    )}
                    {visibleColumns.pkg && (
                      <Cell className={`${styles.Cell} ${styles.NumberCell}`}>
                        <span className={styles.PrimaryData}>
                          {formatNumber(header.pkg, 0)}
                        </span>
                      </Cell>
                    )}
                    {visibleColumns.g_wt && (
                      <Cell className={`${styles.Cell} ${styles.NumberCell}`}>
                        <span className={styles.PrimaryData}>
                          {formatNumber(header.g_wt, 2)}
                        </span>
                      </Cell>
                    )}
                    {visibleColumns.ex_rate && (
                      <Cell className={`${styles.Cell} ${styles.NumberCell}`}>
                        <span className={styles.MetaInfo}>
                          {formatDecimal(header.ex_rate, 2)}
                        </span>
                      </Cell>
                    )}
                    {visibleColumns.no_of_invoices && (
                      <Cell className={`${styles.Cell} ${styles.NumberCell}`}>
                        <span className={styles.MetaInfo}>
                          {formatNumber(header.no_of_invoices, 0)}
                        </span>
                      </Cell>
                    )}
                    {visibleColumns.total_items && (
                      <Cell className={`${styles.Cell} ${styles.NumberCell}`}>
                        <span className={styles.MetaInfo}>
                          {formatNumber(header.total_items, 0)}
                        </span>
                      </Cell>
                    )}
                  </Row>
                  {isExpanded && (
                    <Row key={`${header.be_no}-details`}>
                      <Cell
                        colSpan={
                          Object.values(visibleColumns).filter(Boolean).length
                        }
                        className={styles.DetailsCell}
                      >
                        <div className={styles.DetailsPanel}>
                          <h4 className={styles.DetailsTitle}>Details</h4>
                          <div className={styles.DetailsGrid}>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>Year:</span>
                              <span className={styles.DetailValue}>
                                {header.year}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                IEC Number:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.iec_no}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                GST Number:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.gst_no}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                Port Code:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.port_code}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                BE Date:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.be_date}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                Packages:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.pkg?.toLocaleString()}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                Gross Weight:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.g_wt?.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                Exchange Rate (Exact):
                              </span>
                              <span className={styles.DetailValue}>
                                {header.ex_rate}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                Number of Invoices:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.no_of_invoices}
                              </span>
                            </div>
                            <div className={styles.DetailItem}>
                              <span className={styles.DetailLabel}>
                                Total Items:
                              </span>
                              <span className={styles.DetailValue}>
                                {header.total_items}
                              </span>
                            </div>
                            {header.submission && (
                              <div className={styles.DetailItem}>
                                <span className={styles.DetailLabel}>
                                  Submission:
                                </span>
                                <span className={styles.DetailValue}>
                                  {header.submission}
                                </span>
                              </div>
                            )}
                            {header.assessment && (
                              <div className={styles.DetailItem}>
                                <span className={styles.DetailLabel}>
                                  Assessment:
                                </span>
                                <span className={styles.DetailValue}>
                                  {header.assessment}
                                </span>
                              </div>
                            )}
                            {header.examination && (
                              <div className={styles.DetailItem}>
                                <span className={styles.DetailLabel}>
                                  Examination:
                                </span>
                                <span className={styles.DetailValue}>
                                  {header.examination}
                                </span>
                              </div>
                            )}
                            {header.ooc && (
                              <div className={styles.DetailItem}>
                                <span className={styles.DetailLabel}>OOC:</span>
                                <span className={styles.DetailValue}>
                                  {header.ooc}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Cell>
                    </Row>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );

  return (
    <div className="container h-100">
      <div className={joinClassNames(className, styles.Container)}>
        <div className={styles.StatCard}>
          <div className={styles.StatsContainer}>
            <Card className={styles.StatCard}>
              <StatCard
                secondaryContent="Total BOEs Filed"
                primaryContent={<Count value={2450} />}
                isLoading={loading}
                color="#667eea"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                secondaryContent="Provisional BOEs"
                primaryContent={<Count value={728} />}
                isLoading={loading}
                color="#4facfe"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                secondaryContent="BOEs with Licences"
                primaryContent={<Count value={193} />}
                isLoading={loading}
                color="#43e97b"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                secondaryContent="BOEs with SVB"
                primaryContent={<Count value={112} />}
                isLoading={loading}
                color="#fa709a"
              />
            </Card>
          </div>
        </div>
        <Card title="Filters" className={styles.FiltersCard}>
          {filtersJsx}
        </Card>
        <Card title="Duty Trend" className={styles.GraphCard}>
          <BoeHeaderBarChart />
        </Card>
        <Card title="Duty Split" className={styles.ChartCard}>
          <BoeHeaderPieChart />
        </Card>
        <Card className={styles.TableCard}>
          <BoeTable />
        </Card>
        {/* <Card className={styles.TableCard}>{tableJsx}</Card> */}
      </div>
    </div>
  );
}

export default DashboardPage;
