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
import TextField from "@/components/TextField";
import Button from "@/components/Button";

function DashboardPage({ className }: IDashboardPageProps) {
  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedPort, setSelectedPort] = useState<string>("");

  // Build filters object
  const filters: Record<string, string | number> = {};
  if (selectedYear) filters.year = selectedYear;
  if (selectedPort) filters.port_code = selectedPort;

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

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    refetch({
      page: 1,
      limit: 100,
      search: searchTerm || undefined,
      filters: {
        ...filters,
        year: value ? value : "",
      },
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

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedYear("");
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
            <label htmlFor="year-filter">Year:</label>
            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className={styles.FilterSelect}
            >
              <option value="">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
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
              <option value="INPRT1">INPRT1</option>
              <option value="INPRT2">INPRT2</option>
              <option value="INPRT4">INPRT4</option>
              <option value="INPRT9">INPRT9</option>
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
