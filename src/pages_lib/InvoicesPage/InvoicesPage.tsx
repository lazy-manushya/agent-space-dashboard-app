"use client";

import React, { useState } from "react";
import { joinClassNames } from "@/utils";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Count from "@/components/Count";
import InvoicesTable from "@/features/InvoicesTable";
import InvoiceBarChart from "@/features/InvoiceBarChart";
import InvoicePieChart from "@/features/InvoicePieChart";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import FieldGroup from "@/components/FieldGroup";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { IInvoicesPageProps } from "./InvoicesPage.types";
import styles from "./InvoicesPage.module.css";

function InvoicesPage({ className }: IInvoicesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCurrency("");
    setMinAmount("");
    setMaxAmount("");
  };

  const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

  const filtersJsx = (
    <div className={styles.FilterSection}>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="invoice-search">Search:</Label>
        <TextField
          id="invoice-search"
          type="text"
          placeholder="Search by Invoice No or Supplier..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="currency-select">Currency:</Label>
        <Select
          label="Currency"
          aria-label="Select currency filter"
          placeholder="All Currencies"
          value={selectedCurrency}
          onChange={(value) => setSelectedCurrency(String(value))}
          items={[
            { label: "All Currencies", value: "" },
            ...currencies.map((currency) => ({
              label: currency,
              value: currency,
            })),
          ]}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="min-amount">Min Amount:</Label>
        <TextField
          id="min-amount"
          type="number"
          placeholder="0"
          value={minAmount}
          onChange={setMinAmount}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="max-amount">Max Amount:</Label>
        <TextField
          id="max-amount"
          type="number"
          placeholder="1000000"
          value={maxAmount}
          onChange={setMaxAmount}
        />
      </FieldGroup>
      <Button onClick={handleClearFilters} size="sm">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container h-100">
      <div className={joinClassNames(className, styles.Container)}>
        <div className={styles.StatCard}>
          <div className={styles.StatsContainer}>
            <Card className={styles.StatCard}>
              <StatCard
                icon={<i className="las la-receipt" />}
                secondaryContent="Total number of BOE"
                primaryContent={<Count value={1247} />}
                color="#667eea"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                icon={<i className="las la-certificate" />}
                secondaryContent="BOE with Licence"
                primaryContent={<Count value={342} decimals={0} />}
                color="#4facfe"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                icon={<i className="las la-shield-alt" />}
                secondaryContent="BOE with SVB"
                primaryContent={<Count value={156} />}
                color="#43e97b"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                icon={<i className="las la-handshake" />}
                secondaryContent="BOE with Bond"
                primaryContent={<Count value={89} />}
                color="#fa709a"
              />
            </Card>
          </div>
        </div>
        <Card title="Top Suppliers" className={styles.GraphCard}>
          <InvoiceBarChart />
        </Card>
        <Card title="Currency Split" className={styles.ChartCard}>
          <InvoicePieChart />
        </Card>
        <Card title="Filters" className={styles.FiltersCard}>
          {filtersJsx}
        </Card>
        <Card className={styles.TableCard}>
          <InvoicesTable />
        </Card>
      </div>
    </div>
  );
}

export default InvoicesPage;
