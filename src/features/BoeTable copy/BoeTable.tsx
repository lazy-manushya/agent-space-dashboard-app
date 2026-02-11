import React, { useState } from "react";
import {
  IoChevronDown,
  IoChevronForward,
  IoInformationCircleOutline,
  IoBusinessOutline,
  IoCubeOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import FieldGroup from "@/components/FieldGroup";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Label from "@/components/Label";
import DateRangePicker from "@/components/DateRangePicker";
import { parseDate } from "@internationalized/date";
import {
  Table,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
} from "react-aria-components";
import Text from "@/components/Text";
import TableShimmer from "@/components/TableShimmer";
import { formatNumber, formatDecimal } from "@/utils/dataFormatter";

import styles from "./BoeTable.module.css";

// Table and filter state defaults
const defaultVisibleColumns = {
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
};
const defaultExpandedCategories = {
  basicInfo: true,
  businessDetails: true,
  shipmentDetails: true,
  financialSummary: false,
};
const columnCategories = {
  basicInfo: {
    label: "Basic Information",
    icon: <IoInformationCircleOutline />,
    columns: ["be_no", "year", "be_date"],
  },
  businessDetails: {
    label: "Business Details",
    icon: <IoBusinessOutline />,
    columns: ["iec_no", "gst_no", "port_code"],
  },
  shipmentDetails: {
    label: "Shipment Details",
    icon: <IoCubeOutline />,
    columns: ["pkg", "g_wt"],
  },
  financialSummary: {
    label: "Financial & Summary",
    icon: <IoStatsChartOutline />,
    columns: ["ex_rate", "no_of_invoices", "total_items"],
  },
};

const BoeTable = ({ boeHeaders, loading, error }) => {
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minGWeight, setMinGWeight] = useState(0);
  const [maxGWeight, setMaxGWeight] = useState(0);
  const [minExRate, setMinExRate] = useState(0);
  const [maxExRate, setMaxExRate] = useState(0);
  const [port, setPort] = useState("");
  const [invoices, setInvoices] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Table state
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [expandedCategories, setExpandedCategories] = useState(
    defaultExpandedCategories,
  );
  const [expandedRow, setExpandedRow] = useState(null);

  // Handlers for filters
  const handleSearch = (value) => setSearchTerm(value);
  const handleMinYearChange = (value) => setMinYear(value);
  const handleMaxYearChange = (value) => setMaxYear(value);
  const handleMinGWeightChange = (value) => setMinGWeight(+value);
  const handleMaxGWeightChange = (value) => setMaxGWeight(+value);
  const handleMinExRateChange = (value) => setMinExRate(+value);
  const handleMaxExRateChange = (value) => setMaxExRate(+value);
  const handlePortChange = (value) => setPort(value);
  const handleInvoicesChange = (value) => setInvoices(value);
  const handleDateRangeChange = (value) => {
    setStartDate(value.start ? value.start.toString() : "");
    setEndDate(value.end ? value.end.toString() : "");
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setMinYear("");
    setMaxYear("");
    setMinGWeight(0);
    setMaxGWeight(0);
    setMinExRate(0);
    setMaxExRate(0);
    setPort("");
    setInvoices("");
    setStartDate("");
    setEndDate("");
  };
  type VisibleColumns = {
    [key: string]: boolean;
    be_no: boolean;
    year: boolean;
    iec_no: boolean;
    gst_no: boolean;
    port_code: boolean;
    be_date: boolean;
    pkg: boolean;
    g_wt: boolean;
    ex_rate: boolean;
    no_of_invoices: boolean;
    total_items: boolean;
  };
  type ExpandedCategories = {
    [key: string]: boolean;
    basicInfo: boolean;
    businessDetails: boolean;
    shipmentDetails: boolean;
    financialSummary: boolean;
  };
  type ColumnCategories = {
    [key: string]: {
      label: string;
      icon: React.ReactNode;
      columns: string[];
    };
    basicInfo: {
      label: string;
      icon: React.ReactNode;
      columns: string[];
    };
    businessDetails: {
      label: string;
      icon: React.ReactNode;
      columns: string[];
    };
    shipmentDetails: {
      label: string;
      icon: React.ReactNode;
      columns: string[];
    };
    financialSummary: {
      label: string;
      icon: React.ReactNode;
      columns: string[];
    };
  };
  const defaultVisibleColumns: VisibleColumns = {
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
  };
  const defaultExpandedCategories: ExpandedCategories = {
    basicInfo: true,
    businessDetails: true,
    shipmentDetails: true,
    financialSummary: false,
  };
  const columnCategories: ColumnCategories = {
    basicInfo: {
      label: "Basic Information",
      icon: <IoInformationCircleOutline />,
      columns: ["be_no", "year", "be_date"],
    },
    businessDetails: {
      label: "Business Details",
      icon: <IoBusinessOutline />,
      columns: ["iec_no", "gst_no", "port_code"],
    },
    shipmentDetails: {
      label: "Shipment Details",
      icon: <IoCubeOutline />,
      columns: ["pkg", "g_wt"],
    },
    financialSummary: {
      label: "Financial & Summary",
      icon: <IoStatsChartOutline />,
      columns: ["ex_rate", "no_of_invoices", "total_items"],
    },
  };

  interface BoeTableProps {
    boeHeaders: any[];
    loading: boolean;
    error: string | null;
  }

  const BoeTable: React.FC<BoeTableProps> = ({ boeHeaders, loading, error }) => {
    // Filter state
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [minYear, setMinYear] = useState<string>("");
    const [maxYear, setMaxYear] = useState<string>("");
    const [minGWeight, setMinGWeight] = useState<number>(0);
    const [maxGWeight, setMaxGWeight] = useState<number>(0);
    const [minExRate, setMinExRate] = useState<number>(0);
    const [maxExRate, setMaxExRate] = useState<number>(0);
    const [port, setPort] = useState<string>("");
    const [invoices, setInvoices] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    // Table state
    const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>(defaultVisibleColumns);
    const [expandedCategories, setExpandedCategories] = useState<ExpandedCategories>(defaultExpandedCategories);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    // Handlers for filters
    const handleSearch = (value: string) => setSearchTerm(value);
    const handleMinYearChange = (value: string) => setMinYear(value);
    const handleMaxYearChange = (value: string) => setMaxYear(value);
    const handleMinGWeightChange = (value: string | number) => setMinGWeight(+value);
    const handleMaxGWeightChange = (value: string | number) => setMaxGWeight(+value);
    const handleMinExRateChange = (value: string | number) => setMinExRate(+value);
    const handleMaxExRateChange = (value: string | number) => setMaxExRate(+value);
    const handlePortChange = (value: string) => setPort(value);
    const handleInvoicesChange = (value: string) => setInvoices(value);
    const handleDateRangeChange = (value: { start: Date | null; end: Date | null }) => {
      setStartDate(value.start ? value.start.toString() : "");
      setEndDate(value.end ? value.end.toString() : "");
    };
    const handleClearFilters = () => {
      setSearchTerm("");
      setMinYear("");
      setMaxYear("");
      setMinGWeight(0);
      setMaxGWeight(0);
      setMinExRate(0);
      setMaxExRate(0);
      setPort("");
      setInvoices("");
      setStartDate("");
      setEndDate("");
    };
    // Column toggles
    const toggleColumn = (columnKey: string) => {
      setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
    };
    const toggleCategory = (category: string) => {
      setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    };
    const toggleCategoryColumns = (categoryKey: string, checked: boolean) => {
      const category = columnCategories[categoryKey];
      const updates: { [key: string]: boolean } = {};
      category.columns.forEach((col: string) => {
        updates[col] = checked;
      });
      setVisibleColumns((prev) => ({ ...prev, ...updates }));
    };
    const isCategoryFullyVisible = (categoryKey: string) => {
      const category = columnCategories[categoryKey];
      return category.columns.every((col: string) => visibleColumns[col]);
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
      setVisibleColumns(defaultVisibleColumns);
      setExpandedCategories(defaultExpandedCategories);
    };
    const toggleRowExpansion = (beNo: string) => {
      setExpandedRow(expandedRow === beNo ? null : beNo);
    };
          onChange={handleMaxExRateChange}
          items={[]}
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
          items={[]}
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
          items={[]}
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
        <Label>Column Visibility:</Label>
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
                onClick={() => toggleCategory(categoryKey)}
              >
                <span className={styles.CategoryIcon}>
                  {expandedCategories[categoryKey] ? (
                    <IoChevronDown />
                  ) : (
                    <IoChevronForward />
                  )}
                </span>
                <span className={styles.CategoryEmoji}>{category.icon}</span>
                <span className={styles.CategoryLabel}>{category.label}</span>
                <input
                  type="checkbox"
                  checked={isCategoryFullyVisible(categoryKey)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleCategoryColumns(categoryKey, e.target.checked);
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

  // Table rendering (reuse existing logic, but use internal state)
  return (
    <div className={styles.SubContainer}>
      <div className={styles.FilterCard}>{filtersJsx}</div>
      {loading && <TableShimmer rows={10} columns={11} />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      {!loading && !error && boeHeaders.length > 0 && (
        <Table className={styles.Table}>
          <TableHeader>
            {visibleColumns.be_no && <Column isRowHeader>{"BE No"}</Column>}
            {visibleColumns.year && <Column isRowHeader>{"Year"}</Column>}
            {visibleColumns.iec_no && <Column isRowHeader>{"IEC No"}</Column>}
            {visibleColumns.gst_no && <Column isRowHeader>{"GST No"}</Column>}
            {visibleColumns.port_code && (
              <Column isRowHeader>{"Port Code"}</Column>
            )}
            {visibleColumns.be_date && <Column isRowHeader>{"BE Date"}</Column>}
            {visibleColumns.pkg && <Column isRowHeader>{"Packages"}</Column>}
            {visibleColumns.g_wt && (
              <Column isRowHeader>{"Gross Weight"}</Column>
            )}
            {visibleColumns.ex_rate && (
              <Column isRowHeader>{"Exchange Rate"}</Column>
            )}
            {visibleColumns.no_of_invoices && (
              <Column isRowHeader>{"Invoices"}</Column>
            )}
            {visibleColumns.total_items && <Column isRowHeader>{"Items"}</Column>}
          </TableHeader>
          <TableBody>
            {boeHeaders.map((header) => {
              const isExpanded = expandedRow === header.be_no;
              return (
                <React.Fragment key={header.be_no}>
                  <Row
                    className={styles.ClickableRow}
                    onAction={() => onToggleRow(header.be_no)}
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
};

export default BoeTable;
