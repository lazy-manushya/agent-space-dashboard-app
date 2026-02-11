"use client";

import React, { useState } from "react";
import { IoExpand, IoChevronBack, IoChevronForward } from "react-icons/io5";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import BoeHeaderPieChart from "@/features/BoeHeaderPieChart";
import BoeAirSeaPieChart from "@/features/BoeAirSeaPieChart";
import BoeCountryPieChart from "@/features/BoeCountryPieChart";
import { SplitsOverviewProps, ChartType } from "./SplitsOverview.types";
import styles from "./SplitsOverview.module.css";

const SplitsOverview: React.FC<SplitsOverviewProps> = ({ className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<ChartType>("duty");

  const charts = [
    {
      id: "duty" as ChartType,
      title: "Duty Split",
      subtitle: "Breakdown of duty components across all Bill of Entry submissions",
      component: BoeHeaderPieChart,
    },
    {
      id: "airsea" as ChartType,
      title: "Air/Sea Split",
      subtitle: "Distribution of shipments by transport mode",
      component: BoeAirSeaPieChart,
    },
    {
      id: "country" as ChartType,
      title: "Country Split",
      subtitle: "Distribution of imports by country of origin",
      component: BoeCountryPieChart,
    },
  ];

  const handleMiniChartClick = (chartId: ChartType) => {
    setSelectedChart(chartId);
    setIsModalOpen(true);
  };

  const handleExpandAll = () => {
    setSelectedChart("duty");
    setIsModalOpen(true);
  };

  const navigateChart = (direction: "prev" | "next") => {
    const currentIndex = charts.findIndex((c) => c.id === selectedChart);
    let newIndex: number;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : charts.length - 1;
    } else {
      newIndex = currentIndex < charts.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedChart(charts[newIndex].id);
  };

  const SelectedChartComponent =
    charts.find((c) => c.id === selectedChart)?.component || BoeHeaderPieChart;
  const selectedChartTitle =
    charts.find((c) => c.id === selectedChart)?.title || "Chart";

  return (
    <>
      <div className={`${styles.splitsOverview} ${className}`}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>Data Splits Overview</h2>
            <p className={styles.subtitle}>Click any chart to view details</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExpandAll}
            className={styles.expandButton}
          >
            <IoExpand size={16} />
            <span>View All</span>
          </Button>
        </div>

        <div className={styles.chartsGrid}>
          {charts.map((chart) => {
            const ChartComponent = chart.component;
            return (
              <div
                key={chart.id}
                className={styles.miniChart}
                onClick={() => handleMiniChartClick(chart.id)}
                role="button"
                tabIndex={0}
                aria-label={`View ${chart.title} details`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleMiniChartClick(chart.id);
                  }
                }}
              >
                <div className={styles.miniChartContent}>
                  <ChartComponent showAsDonut={false} hideTitle={true} chartMargin={45} />
                  <div className={styles.miniChartTextOverlay}>
                    <h3 className={styles.miniChartTitle}>{chart.title}</h3>
                    <p className={styles.miniChartSubtitle}>{chart.subtitle}</p>
                  </div>
                  <div className={styles.miniChartHoverOverlay}>
                    <span className={styles.clickHint}>Click to enlarge</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        className={styles.chartModal}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{selectedChartTitle}</h2>
          </div>

          <div className={styles.modalChartContainer}>
            <SelectedChartComponent showAsDonut={false} />
          </div>

          <div className={styles.modalNavigation}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigateChart("prev")}
              className={styles.navButton}
            >
              <IoChevronBack size={20} />
              <span>Previous</span>
            </Button>

            <div className={styles.navIndicators}>
              {charts.map((chart, index) => (
                <button
                  key={chart.id}
                  className={`${styles.navDot} ${
                    chart.id === selectedChart ? styles.navDotActive : ""
                  }`}
                  onClick={() => setSelectedChart(chart.id)}
                  aria-label={`Go to ${chart.title}`}
                />
              ))}
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={() => navigateChart("next")}
              className={styles.navButton}
            >
              <span>Next</span>
              <IoChevronForward size={20} />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SplitsOverview;
