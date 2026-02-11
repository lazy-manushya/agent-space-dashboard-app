"use client";

import React, { useState } from "react";
import { joinClassNames } from "@/utils";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Count from "@/components/Count";
import DutiesTable from "@/features/DutiesTable";
import DutyBarChart from "@/features/DutyBarChart";
import DutyPieChart from "@/features/DutyPieChart";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import FieldGroup from "@/components/FieldGroup";
import Label from "@/components/Label";
import { IDutiesPageProps } from "./DutiesPage.types";
import styles from "./DutiesPage.module.css";

function DutiesPage({ className }: IDutiesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minBcdPct, setMinBcdPct] = useState("");
  const [maxBcdPct, setMaxBcdPct] = useState("");
  const [minIgstPct, setMinIgstPct] = useState("");
  const [maxIgstPct, setMaxIgstPct] = useState("");

  const handleClearFilters = () => {
    setSearchTerm("");
    setMinBcdPct("");
    setMaxBcdPct("");
    setMinIgstPct("");
    setMaxIgstPct("");
  };

  const filtersJsx = (
    <div className={styles.FilterSection}>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="duty-search">Search:</Label>
        <TextField
          id="duty-search"
          type="text"
          placeholder="Search by BE No or Duty ID..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="min-bcd">Min BCD %:</Label>
        <TextField
          id="min-bcd"
          type="number"
          placeholder="0"
          value={minBcdPct}
          onChange={setMinBcdPct}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="max-bcd">Max BCD %:</Label>
        <TextField
          id="max-bcd"
          type="number"
          placeholder="100"
          value={maxBcdPct}
          onChange={setMaxBcdPct}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="min-igst">Min IGST %:</Label>
        <TextField
          id="min-igst"
          type="number"
          placeholder="0"
          value={minIgstPct}
          onChange={setMinIgstPct}
        />
      </FieldGroup>
      <FieldGroup className={styles.FilterGroup}>
        <Label htmlFor="max-igst">Max IGST %:</Label>
        <TextField
          id="max-igst"
          type="number"
          placeholder="100"
          value={maxIgstPct}
          onChange={setMaxIgstPct}
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
                secondaryContent="Total Number of Boe"
                primaryContent={<Count value={1247} />}
                color="#667eea"
              />
            </Card>
            {/* <Card className={styles.StatCard}>
              <StatCard
                secondaryContent="Total BCD Amount"
                primaryContent={<Count value={45680000} decimals={0} />}
                color="#4facfe"
              />
            </Card> */}
            <Card className={styles.StatCard}>
              <StatCard
                secondaryContent=" Total Assessable Value"
                primaryContent={<Count value={128500000} decimals={0} />}
                color="#43e97b"
              />
            </Card>
            <Card className={styles.StatCard}>
              <StatCard
                secondaryContent="Total Duty %"
                primaryContent={<Count value={18.5} decimals={1} />}
                color="#fa709a"
              />
            </Card>
          </div>
        </div>
        <Card title="Duty by Port" className={styles.GraphCard}>
          <DutyBarChart />
        </Card>
        <Card title="Duty by CHA" className={styles.ChartCard}>
          <DutyPieChart />
        </Card>
        <Card title="Filters" className={styles.FiltersCard}>
          {filtersJsx}
        </Card>
        <Card className={styles.TableCard}>
          <DutiesTable />
        </Card>
      </div>
    </div>
  );
}

export default DutiesPage;
