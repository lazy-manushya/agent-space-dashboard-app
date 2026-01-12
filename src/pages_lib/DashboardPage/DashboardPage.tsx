"use client";

import { useState } from "react";
import { joinClassNames } from "@/utils";
import Layout from "@/features/Layout";

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
import { useBoeHeaders } from "@/services/Routing/hooks/BoeHeaders/useBoeHeaders";
import { useBoeHeadersMetadata } from "@/services/hooks/useBoeHeadersMetadata";
import TextField from "@/components/TextField";
import Button from "@/components/Button";

function DashboardPage({ className }: IDashboardPageProps) {
  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMinYear, setSelectedMinYear] = useState<string>("");
  const [selectedMaxYear, setSelectedMaxYear] = useState<string>("");
  const [selectedMinGWeight, setSelectedMinGWeight] = useState<string>("");
  const [selectedMaxGWeight, setSelectedMaxGWeight] = useState<string>("");
  const [selectedPort, setSelectedPort] = useState<string>("");
  const [selectedInvoices, setSelectedInvoices] = useState<string>("");

  // Fetch metadata (unique values for filters)
  const {
    metadata,
    loading: metadataLoading,
    error: metadataError,
  } = useBoeHeadersMetadata();

  // Build filters object with year range handling
  const buildFilters = () => {
    const filters: Record<string, string | number> = {};
    if (selectedMinYear) filters.min_year = selectedMinYear;
    if (selectedMaxYear) filters.max_year = selectedMaxYear;
    if (selectedMinGWeight) filters.min_g_weight = selectedMinGWeight;
    if (selectedMaxGWeight) filters.max_g_weight = selectedMaxGWeight;
    if (selectedPort) filters.port_code = selectedPort;
    if (selectedInvoices) filters.no_of_invoices = selectedInvoices;
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

  const handleMinGWeightChange = (value: string) => {
    setSelectedMinGWeight(value);
    const newFilters: any = {
      ...filters,
      min_g_weight: value || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key]
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMaxGWeightChange = (value: string) => {
    setSelectedMaxGWeight(value);
    const newFilters: any = {
      ...filters,
      max_g_weight: value || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key]
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMinYearChange = (value: string) => {
    setSelectedMinYear(value);
    const newFilters: any = {
      ...filters,
      min_year: value || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key]
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handleMaxYearChange = (value: string) => {
    setSelectedMaxYear(value);
    const newFilters: any = {
      ...filters,
      max_year: value || undefined,
    };
    // Remove undefined values
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key]
    );
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
    });
  };

  const handlePortChange = (value: string) => {
    setSelectedPort(value);
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: {
        ...filters,
        port_code: value || "",
      },
    });
  };

  const handleInvoicesChange = (value: string) => {
    setSelectedInvoices(value);
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: {
        ...filters,
        no_of_invoices: value || "",
      },
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMinYear("");
    setSelectedMaxYear("");
    setSelectedPort("");
    refetch({
      page: 1,
      limit: 100,
    });
  };

  return (
    <Layout>
      <div className={joinClassNames(className, styles.Container)}>
        <h1>BOE Headers</h1>

        {/* Filter Section */}
        <div className={styles.FilterSection}>
          <div className={styles.FilterGroup}>
            <label htmlFor="search-box">Search:</label>
            <TextField
              className={styles.SearchInput}
              id="search-box"
              type="text"
              placeholder="Search by BE No, IEC No, or GST No..."
              value={searchTerm}
              onChange={(value) => handleSearch(value)}
            />
          </div>

          <div className={styles.FilterGroup}>
            <label htmlFor="year-filter">Min Year:</label>
            <select
              id="year-filter"
              value={selectedMinYear}
              onChange={(e) => handleMinYearChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Years</option>
              {metadataLoading ? (
                <option disabled>Loading years...</option>
              ) : metadataError ? (
                <option disabled>Error loading years</option>
              ) : (
                metadata?.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className={styles.FilterGroup}>
            <label htmlFor="year-filter">Max Year:</label>
            <select
              id="year-filter"
              value={selectedMaxYear}
              onChange={(e) => handleMaxYearChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Years</option>
              {metadataLoading ? (
                <option disabled>Loading years...</option>
              ) : metadataError ? (
                <option disabled>Error loading years</option>
              ) : (
                metadata?.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className={styles.FilterGroup}>
            <label htmlFor="gross-weight-filter">Min Gross Weight:</label>
            <select
              id="gross-weight-filter"
              value={selectedMinGWeight}
              onChange={(e) => handleMinGWeightChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Gross Weights</option>
              {metadataLoading ? (
                <option disabled>Loading Gross Weights...</option>
              ) : metadataError ? (
                <option disabled>Error loading Gross Weights</option>
              ) : (
                metadata?.grossWeights.map((grossWeight) => (
                  <option key={grossWeight} value={grossWeight}>
                    {grossWeight}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className={styles.FilterGroup}>
            <label htmlFor="gross-weight-filter">Max Gross Weight:</label>
            <select
              id="gross-weight-filter"
              value={selectedMaxGWeight}
              onChange={(e) => handleMaxGWeightChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Gross Weights</option>
              {metadataLoading ? (
                <option disabled>Loading Gross Weights...</option>
              ) : metadataError ? (
                <option disabled>Error loading Gross Weights</option>
              ) : (
                metadata?.grossWeights.map((grossWeight) => (
                  <option key={grossWeight} value={grossWeight}>
                    {grossWeight}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className={styles.FilterGroup}>
            <label htmlFor="port-filter">Port Code:</label>
            <select
              id="port-filter"
              value={selectedPort}
              onChange={(e) => handlePortChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Ports</option>
              {metadataLoading ? (
                <option disabled>Loading ports...</option>
              ) : metadataError ? (
                <option disabled>Error loading ports</option>
              ) : (
                metadata?.portCodes.map((port) => (
                  <option key={port} value={port}>
                    {port}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className={styles.FilterGroup}>
            <label htmlFor="invoices">Invoices:</label>
            <select
              id="invoices"
              value={selectedInvoices}
              onChange={(e) => handleInvoicesChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Invoices</option>
              {metadataLoading ? (
                <option disabled>Loading Invoices...</option>
              ) : metadataError ? (
                <option disabled>Error loading invoices</option>
              ) : (
                metadata?.invoices.map((invoice) => (
                  <option key={invoice} value={invoice}>
                    {invoice}
                  </option>
                ))
              )}
            </select>
          </div>

          <Button
            onClick={handleClearFilters}
            size={"sm"}
            className={styles.ClearButton}
          >
            Clear Filters
          </Button>
        </div>

        <div className={styles.SubContainer}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
      </div>
    </Layout>
  );
}

export default DashboardPage;
