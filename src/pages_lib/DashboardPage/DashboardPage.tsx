"use client";

import { useState } from "react";
import {
  today,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";

import { joinClassNames } from "@/utils";
import Card from "@/components/Card";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Label from "@/components/Label";
import FieldGroup from "@/components/FieldGroup";
import Text from "@/components/Text";
import DateRangePicker from "@/components/DateRangePicker";

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

function DashboardPage({ className }: IDashboardPageProps) {
  const now = today(getLocalTimeZone());

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMinYear, setSelectedMinYear] = useState<string>("");
  const [selectedMaxYear, setSelectedMaxYear] = useState<string>("");
  const [selectedMinGWeight, setSelectedMinGWeight] = useState<string>("");
  const [selectedMaxExRate, setSelectedMaxExRate] = useState<string>("");
  const [selectedMinExRate, setSelectedMinExRate] = useState<string>("");
  const [selectedMaxGWeight, setSelectedMaxGWeight] = useState<string>("");
  const [selectedPort, setSelectedPort] = useState<string>("");
  const [selectedInvoices, setSelectedInvoices] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    start: DateValue | null;
    end: DateValue | null;
  }>({
    start: null,
    end: null,
  });

  // Fetch metadata (unique values for filters)
  const {
    metadata,
    loading: metadataLoading,
    error: metadataError,
  } = useBoeHeadersMetadata();

  // Build filters object with year range handling and date range
  const buildFilters = () => {
    const filters: Record<string, string | number> = {};
    if (selectedMinYear) filters.min_year = selectedMinYear;
    if (selectedMaxYear) filters.max_year = selectedMaxYear;
    if (selectedMinGWeight) filters.min_g_weight = selectedMinGWeight;
    if (selectedMaxGWeight) filters.max_g_weight = selectedMaxGWeight;
    if (selectedMinExRate) filters.min_ex_rate = selectedMinExRate;
    if (selectedMaxExRate) filters.max_ex_rate = selectedMaxExRate;
    if (selectedPort) filters.port_code = selectedPort;
    if (selectedInvoices) filters.no_of_invoices = selectedInvoices;

    // Add date range filters
    if (dateRange.start) {
      filters.start_date = dateRange.start.toString(); // Format: YYYY-MM-DD
    }
    if (dateRange.end) {
      filters.end_date = dateRange.end.toString(); // Format: YYYY-MM-DD
    }

    return filters;
  };

  const filters = buildFilters();

  const {
    data: boeHeaders,
    loading,
    error,
    refetch,
  } = useBoeHeaders({
    page: 1,
    limit: 100,
    search: searchTerm || undefined,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
  });

  // Handle filter changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    refetch({
      page: 1,
      limit: 100,
      search: value || undefined,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    });
  };

  const handleMinGWeightChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedMinGWeight(stringValue);
    const newFilters: any = {
      ...filters,
      min_g_weight: stringValue || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key],
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMaxGWeightChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedMaxGWeight(stringValue);
    const newFilters: any = {
      ...filters,
      max_g_weight: stringValue || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key],
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMinYearChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedMinYear(stringValue);
    const newFilters: any = {
      ...filters,
      min_year: stringValue || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key],
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMaxYearChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedMaxYear(stringValue);
    const newFilters: any = {
      ...filters,
      max_year: stringValue || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key],
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMinExRateChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedMinExRate(stringValue);
    const newFilters: any = {
      ...filters,
      min_ex_rate: stringValue || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key],
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMaxExRateChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedMaxExRate(stringValue);
    const newFilters: any = {
      ...filters,
      max_ex_rate: stringValue || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key],
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handlePortChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedPort(stringValue);
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: {
        ...filters,
        port_code: stringValue || "",
      },
    });
  };

  const handleInvoicesChange = (value: string | number) => {
    const stringValue = String(value);
    setSelectedInvoices(stringValue);
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: {
        ...filters,
        no_of_invoices: stringValue || "",
      },
    });
  };

  const handleDateRangeChange = (
    value: { start: DateValue; end: DateValue } | null,
  ) => {
    if (value) {
      setDateRange(value);

      // Build filters with the new date range values
      const newFilters: Record<string, string | number> = {};
      if (selectedMinYear) newFilters.min_year = selectedMinYear;
      if (selectedMaxYear) newFilters.max_year = selectedMaxYear;
      if (selectedMinGWeight) newFilters.min_g_weight = selectedMinGWeight;
      if (selectedMaxGWeight) newFilters.max_g_weight = selectedMaxGWeight;
      if (selectedMinExRate) newFilters.min_ex_rate = selectedMinExRate;
      if (selectedMaxExRate) newFilters.max_ex_rate = selectedMaxExRate;
      if (selectedPort) newFilters.port_code = selectedPort;
      if (selectedInvoices) newFilters.no_of_invoices = selectedInvoices;

      // Add the new date range to filters
      newFilters.start_date = value.start.toString();
      newFilters.end_date = value.end.toString();

      refetch({
        page: 1,
        limit: 100,
        search: searchTerm || undefined,
        filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
      });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMinYear("");
    setSelectedMaxYear("");
    setSelectedMinGWeight("");
    setSelectedMaxGWeight("");
    setSelectedMinExRate("");
    setSelectedMaxExRate("");
    setSelectedPort("");
    setSelectedInvoices("");
    // Reset date range to empty/null
    setDateRange({
      start: null,
      end: null,
    });
    refetch({
      page: 1,
      limit: 100,
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
          onChange={(value) => handleSearch(value)}
        />
      </FieldGroup>

      <FieldGroup className={styles.FilterGroup}>
        <DateRangePicker
          label="Date Range"
          value={dateRange}
          onChange={handleDateRangeChange}
          aria-label="Select date range for filtering"
        />
      </FieldGroup>

      <FieldGroup className={styles.FilterGroup}>
        <Label>Min Year:</Label>
        <Select
          label="Min Year"
          placeholder="All Years"
          value={selectedMinYear}
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
          placeholder="All Years"
          value={selectedMaxYear}
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
          placeholder="All Gross Weights"
          value={selectedMinGWeight}
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
          placeholder="All Gross Weights"
          value={selectedMaxGWeight}
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
          placeholder="All Exchange Rates"
          value={selectedMinExRate}
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
          placeholder="All Exchange Rates"
          value={selectedMaxExRate}
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
          placeholder="All Ports"
          value={selectedPort}
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
          placeholder="All Invoices"
          value={selectedInvoices}
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
    </div>
  );

  const tableJsx = (
    <div className={styles.SubContainer}>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      {!loading && !error && boeHeaders.length > 0 && (
        <Table className={styles.Table}>
          <TableHeader>
            <Column>BE No</Column>
            <Column>Year</Column>
            <Column>IEC No</Column>
            <Column>GST No</Column>
            <Column>Port Code</Column>
            <Column>BE Date</Column>
            <Column>Packages</Column>
            <Column>Gross Weight</Column>
            <Column>Exchange Rate</Column>
            <Column>Invoices</Column>
            <Column>Items</Column>
          </TableHeader>
          <TableBody>
            {boeHeaders.map((header) => (
              <Row key={header.be_no}>
                <Cell className={styles.Cell}>{header.be_no}</Cell>
                <Cell className={styles.Cell}>{header.year}</Cell>
                <Cell className={styles.Cell}>{header.iec_no}</Cell>
                <Cell className={styles.Cell}>{header.gst_no}</Cell>
                <Cell className={styles.Cell}>{header.port_code}</Cell>
                <Cell className={styles.Cell}>{header.be_date}</Cell>
                <Cell className={styles.Cell}>{header.pkg}</Cell>
                <Cell className={styles.Cell}>{header.g_wt}</Cell>
                <Cell className={styles.Cell}>{header.ex_rate}</Cell>
                <Cell className={styles.Cell}>{header.no_of_invoices}</Cell>
                <Cell className={styles.Cell}>{header.total_items}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  return (
    <div className="container h-100">
      <div className={joinClassNames(className, styles.Container)}>
        <Card className={styles.StatCard}>
          <span className={styles.Stat}>240</span>&nbsp;&nbsp;units
        </Card>
        <Card title="Stats">-</Card>
        <Card title="Filters">{filtersJsx}</Card>
        <Card title="Units">{tableJsx}</Card>
      </div>
    </div>
  );

  return (
    <div className={joinClassNames(className, styles.Container)}>
      <h1>BOE Headers</h1>

      {/* Filter Section */}
    </div>
  );
}

export default DashboardPage;
