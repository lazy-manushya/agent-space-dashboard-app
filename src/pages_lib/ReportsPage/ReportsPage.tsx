"use client";

import React, { useState } from "react";
import {
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoTrophyOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoPrintOutline,
  IoDownloadOutline,
} from "react-icons/io5";

import { joinClassNames } from "@/utils";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Button from "@/components/Button";
import ReportRadioGroup from "@/components/ReportRadioGroup";
import BoeTable from "@/features/BoeTable";
import { CHART_COLORS } from "@/config/colors";

import {
  IReportsPageProps,
  ReportConfig,
  ReportType,
} from "./ReportsPage.types";
import styles from "./ReportsPage.module.css";

const REPORT_CONFIGS: ReportConfig[] = [
  {
    id: "duty-report",
    title: "Duty Report",
    subtitle: "CHA allocation & duty breakdown",
    icon: <IoDocumentTextOutline />,
    color: CHART_COLORS[0],
    statCards: [
      {
        label: "Total Shipments",
        value: "3,386",
        icon: <i className="las la-shipping-fast" />,
        color: CHART_COLORS[0],
      },
      {
        label: "Total Ass. Value",
        value: "₹1,542 Cr",
        icon: <i className="las la-money-bill-wave" />,
        color: CHART_COLORS[1],
      },
      {
        label: "Total Duty",
        value: "₹285 Cr",
        icon: <i className="las la-file-invoice-dollar" />,
        color: CHART_COLORS[2],
      },
      {
        label: "Active CHAs",
        value: "7",
        icon: <i className="las la-users" />,
        color: CHART_COLORS[3],
      },
    ],
  },
  {
    id: "monthly-bond-report",
    title: "Monthly Bond Report",
    subtitle: "Bond BOEs & duty foregone",
    icon: <IoShieldCheckmarkOutline />,
    color: CHART_COLORS[1],
    statCards: [
      {
        label: "No. of BOE",
        value: "156",
        icon: <i className="las la-file-alt" />,
        color: CHART_COLORS[0],
      },
      {
        label: "Assessable Value",
        value: "₹24.8 Cr",
        icon: <i className="las la-calculator" />,
        color: CHART_COLORS[1],
      },
      {
        label: "Duty Paid",
        value: "₹3.2 Cr",
        icon: <i className="las la-credit-card" />,
        color: CHART_COLORS[2],
      },
      {
        label: "Duty Foregone",
        value: "₹1.8 Cr",
        icon: <i className="las la-hand-holding-usd" />,
        color: CHART_COLORS[3],
      },
    ],
  },
  {
    id: "rodtep-report",
    title: "RODTEP Report",
    subtitle: "RODTEP utilization & duty saved",
    icon: <IoTrophyOutline />,
    color: CHART_COLORS[2],
    statCards: [
      {
        label: "No. of BOE",
        value: "89",
        icon: <i className="las la-file-contract" />,
        color: CHART_COLORS[0],
      },
      {
        label: "Total Debit Value",
        value: "₹12.4 Cr",
        icon: <i className="las la-wallet" />,
        color: CHART_COLORS[1],
      },
      {
        label: "Debit Duty",
        value: "₹31.2 L",
        icon: <i className="las la-minus-circle" />,
        color: CHART_COLORS[2],
      },
      {
        label: "Duty Saved",
        value: "₹31.2 L",
        icon: <i className="las la-piggy-bank" />,
        color: CHART_COLORS[3],
      },
    ],
  },
  {
    id: "audit-report",
    title: "Audit Report",
    subtitle: "Complete BOE audit details",
    icon: <IoSearchOutline />,
    color: CHART_COLORS[3],
    statCards: [
      {
        label: "Total BOE",
        value: "1,247",
        icon: <i className="las la-clipboard-list" />,
        color: CHART_COLORS[0],
      },
      {
        label: "With Licence",
        value: "342",
        icon: <i className="las la-certificate" />,
        color: CHART_COLORS[1],
      },
      {
        label: "With SVB",
        value: "156",
        icon: <i className="las la-shield-alt" />,
        color: CHART_COLORS[2],
      },
      {
        label: "With Bond",
        value: "89",
        icon: <i className="las la-handshake" />,
        color: CHART_COLORS[3],
      },
      {
        label: "Duty Foregone",
        value: "₹2.4 Cr",
        icon: <i className="las la-hand-holding-usd" />,
        color: CHART_COLORS[4] || CHART_COLORS[0],
      },
    ],
  },
  {
    id: "accounts-report",
    title: "Accounts Report",
    subtitle: "HSN wise & financial summary",
    icon: <IoStatsChartOutline />,
    color: CHART_COLORS[4] || CHART_COLORS[0],
    statCards: [
      {
        label: "Total BOE",
        value: "1,247",
        icon: <i className="las la-file-invoice" />,
        color: CHART_COLORS[0],
      },
      {
        label: "Total Ass. Value",
        value: "₹485 Cr",
        icon: <i className="las la-chart-line" />,
        color: CHART_COLORS[1],
      },
      {
        label: "Total Duty",
        value: "₹78.5 Cr",
        icon: <i className="las la-coins" />,
        color: CHART_COLORS[2],
      },
      {
        label: "HSN Codes",
        value: "85",
        icon: <i className="las la-barcode" />,
        color: CHART_COLORS[3],
      },
    ],
  },
];

function ReportsPage({ className }: IReportsPageProps) {
  const [selectedReport, setSelectedReport] =
    useState<ReportType>("duty-report");

  const currentReportConfig = REPORT_CONFIGS.find(
    (config) => config.id === selectedReport,
  );

  const handleReportChange = (reportId: string) => {
    setSelectedReport(reportId as ReportType);
  };

  return (
    <div
      className={joinClassNames(
        className,
        styles.Container,
        "d-flex flex-column container",
      )}
    >
      {/* Header */}
      <div className={styles.Header}>
        <h1 className={styles.Title}>Reports</h1>
      </div>

      {/* Report Selection */}
      <ReportRadioGroup
        options={REPORT_CONFIGS.map((config) => ({
          id: config.id,
          title: config.title,
          subtitle: config.subtitle,
          icon: config.icon,
          color: config.color,
        }))}
        value={selectedReport}
        onChange={handleReportChange}
      />

      {/* Results Section */}
      {currentReportConfig && (
        <Card
          className={joinClassNames(styles.ResultsCard, "flex-grow-1")}
          title={
            <div className="d-flex align-items-center justify-content-between">
              <div>{currentReportConfig.title}</div>{" "}
              <div className={styles.ActionsHeader}>
                <div className={styles.ActionButtons}>
                  <Button variant="secondary" size="sm">
                    <IoPrintOutline />
                    Print
                  </Button>
                  <Button variant="primary" size="sm">
                    <IoDownloadOutline />
                    Export Excel
                  </Button>
                </div>
              </div>
            </div>
          }
          contentContainerClassName="d-flex flex-column gap-3 h-100 overflow-hidden"
        >
          {/* Stat Cards */}
          <div className={styles.StatsContainer}>
            {currentReportConfig.statCards.map((stat, index) => (
              <Card key={index} className={styles.StatCard}>
                <StatCard
                  icon={stat.icon}
                  secondaryContent={stat.label}
                  primaryContent={stat.value}
                  color={stat.color}
                  size={"sm"}
                  className="px-2"
                />
              </Card>
            ))}
          </div>

          {/* Data Table */}
          <BoeTable className="flex-grow-1 overflow-hidden" />
        </Card>
      )}
    </div>
  );
}

export default ReportsPage;
