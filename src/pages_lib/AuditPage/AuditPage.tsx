"use client";

import Card from "@/components/Card";
import Count from "@/components/Count";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";

const DUMMY_TOP_SUPPLIERS_DATA = [
  { label: "ABC Trading", value: 425, color: "#667eea" },
  { label: "Global Imports", value: 425, color: "#4facfe" },
  { label: "XYZ Corp", value: 892, color: "#43e97b" },
  { label: "Sunrise Exports", value: 150, color: "#fa709a" },
  { label: "Tech Solutions", value: 150, color: "#d3ba00" },
];

const DUMMY_CURRENCY_SPLIT_DATA = [
  { label: "USD", value: 425, color: "#667eea" },
  { label: "EUR", value: 425, color: "#4facfe" },
  { label: "GBP", value: 892, color: "#43e97b" },
  { label: "INR", value: 150, color: "#fa709a" },
  { label: "JPY", value: 150, color: "#d3ba00" },
];

const DUMMY_BOE_SPLIT_DATA = [
  { label: "BOE with Licence", value: 342, color: "#667eea" },
  { label: "BOE with SVB", value: 156, color: "#4facfe" },
  { label: "BOE with Bond", value: 89, color: "#43e97b" },
];

function DutiesPage() {
  return (
    <div className="container h-100">
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
        }}
      >
        {[
          {
            title: "Total Number of BOE",
            icon: <i className="las la-home" />,
            primaryContent: <Count value={1247} />,
            color: "#667eea",
          },
          {
            title: "BOE with Licence",
            icon: <i className="las la-dollar-sign" />,
            primaryContent: <Count value={342} />,
            color: "#4facfe",
          },
          {
            title: "BOE with SVB",
            icon: <i className="las la-coins" />,
            primaryContent: <Count value={156} />,
            color: "#43e97b",
          },
          {
            title: "BOE with Bond",
            icon: <i className="las la-file" />,
            primaryContent: <Count value={89} />,
            color: "#db2777",
          },
        ].map((stat, index) => (
          <Card key={index} style={{ flex: 1 }}>
            <StatCard
              icon={stat.icon}
              secondaryContent={stat.title}
              primaryContent={stat.primaryContent}
              color={stat.color}
            />
          </Card>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "1.5rem",
          height: "420px",
        }}
      >
        <Card
          title="Top Suppliers"
          style={{
            flex: "1",
            height: "100%",
          }}
        >
          <BarChart
            data={DUMMY_TOP_SUPPLIERS_DATA}
            margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
            showLabels={true}
            animate={true}
          />
        </Card>

        <Card
          title="Currency Split"
          style={{
            flex: "1",
            height: "100%",
          }}
        >
          <PieChart
            data={DUMMY_CURRENCY_SPLIT_DATA}
            showLabels={false}
            animate={true}
          />
        </Card>
      </div>

      <Card
        title="BOE Split"
        style={{
          flex: "1",
          height: "480px",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "1rem",
          }}
        >
          <p>Distribution of BOE by Licence, SVB, and Bond categories</p>
          <div
            style={{
              flex: 1,
            }}
          >
            <PieChart
              data={DUMMY_BOE_SPLIT_DATA}
              showLabels={true}
              animate={true}
              innerRadius={50}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DutiesPage;
