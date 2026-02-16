"use client";

import Card from "@/components/Card";
import Count from "@/components/Count";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import BoeAirSeaPieChart from "@/features/BoeAirSeaPieChart";
import LineChart from "@/components/LineChart";

const DUMMY_DUTY_BY_PORT_DATA = [
  { label: "INABG1", value: 1250, color: "#667eea" },
  { label: "INNSA1", value: 980, color: "#4facfe" },
  { label: "INMAA1", value: 750, color: "#43e97b" },
  { label: "INBLR4", value: 620, color: "#fa709a" },
  { label: "INDEL1", value: 450, color: "#fee140" },
  { label: "INCCU1", value: 450, color: "#fee140" },
];

const DUMMY_DUTY_BY_CHA_DATA = [
  { label: "ABC Customs Services", value: 4250, color: "#667eea" },
  { label: "Global Trade Logistics", value: 425, color: "#4facfe" },
  { label: "Express Clearance Co.", value: 8925, color: "#43e97b" },
  { label: "Swift Customs Brokers", value: 150, color: "#fa709a" },
  { label: "Others", value: 150, color: "#d3ba00" },
];

const DUMMY_COUNTRY_SPLIT_DATA = [
  { label: "India", value: 1250, color: "#667eea" },
  { label: "United States", value: 980, color: "#4facfe" },
  { label: "China", value: 750, color: "#43e97b" },
  { label: "Germany", value: 450, color: "#fee140" },
  { label: "Japan", value: 620, color: "#fa709a" },
];

const DUMMY_DUTY_TREND_DATA = [
  { label: "Jan", value: 14 },
  { label: "Feb", value: 15 },
  { label: "Mar", value: 16 },
  { label: "Apr", value: 17 },
  { label: "May", value: 18 },
  { label: "Jun", value: 19 },
  { label: "Jul", value: 20 },
  { label: "Aug", value: 21 },
  { label: "Sep", value: 22 },
  { label: "Oct", value: 23 },
  { label: "Nov", value: 24 },
  { label: "Dec", value: 25 },
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
            title: "Total Assessable Value",
            icon: <i className="las la-dollar-sign" />,
            primaryContent: (
              <>
                <Count value={128.5} />
                &nbsp;Cr
              </>
            ),
            color: "#4facfe",
          },
          {
            title: "Total Duty",
            icon: <i className="las la-coins" />,
            primaryContent: (
              <>
                <Count value={22.45} />
                &nbsp;Cr
              </>
            ),
            color: "#43e97b",
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
        }}
      >
        {[
          {
            title: "BCD",
            primaryContent: (
              <>
                <Count value={8.2} />
                &nbsp;Cr
              </>
            ),
          },
          {
            title: "IGST",
            primaryContent: (
              <>
                <Count value={12.1} />
                &nbsp;Cr
              </>
            ),
          },
          {
            title: "SWS",
            primaryContent: (
              <>
                <Count value={1.8} />
                &nbsp;Cr
              </>
            ),
          },
          {
            title: "PIF",
            primaryContent: (
              <>
                <Count value={0.35} />
                &nbsp;Cr
              </>
            ),
          },
        ].map((stat, index) => (
          <Card key={index} style={{ flex: 1 }}>
            <StatCard
              secondaryContent={stat.title}
              primaryContent={stat.primaryContent}
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
          title="Duty by Port"
          style={{
            flex: "1",
            height: "100%",
          }}
        >
          <BarChart
            data={DUMMY_DUTY_BY_PORT_DATA}
            margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
            showLabels={true}
            animate={true}
          />
        </Card>

        <Card
          title="Duty by CHA"
          style={{
            flex: "1",
            height: "100%",
          }}
        >
          <PieChart
            data={DUMMY_DUTY_BY_CHA_DATA}
            showLabels={false}
            animate={true}
          />
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "1.5rem",
          height: "560px",
        }}
      >
        <Card
          title="Country Split"
          style={{
            flex: "1",
            height: "100%",
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
            <p>Distribution of imports by country of origin India</p>
            <div
              style={{
                flex: 1,
              }}
            >
              <PieChart
                data={DUMMY_COUNTRY_SPLIT_DATA}
                margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
                showLabels={false}
                animate={true}
              />
            </div>
          </div>
        </Card>

        <Card
          title="Air/Sea Split"
          style={{
            flex: "1",
            height: "100%",
          }}
        >
          <BoeAirSeaPieChart />
        </Card>
      </div>

      <Card
        title="Duty % Trend"
        style={{
          flex: "1",
          height: "480px",
          marginTop: "1.5rem",
        }}
      >
        <LineChart
          data={DUMMY_DUTY_TREND_DATA}
          margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
          animate={true}
        />
      </Card>
    </div>
  );
}

export default DutiesPage;
