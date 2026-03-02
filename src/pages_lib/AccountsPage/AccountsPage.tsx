"use client";

import Card from "@/components/Card";
import Count from "@/components/Count";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import Table, { Column } from "@/components/Table";
import { CHART_COLORS } from '@/config/colors';

// HSN Data Interface
interface IHsnData {
  rank: number;
  hsn_code: string;
  description: string;
  no_of_entries: number;
  assessable_value: number; // in crores
  duty: number; // in crores
}

// BOE Records Data Interface
interface IBoeRecordData {
  be_no: string;
  year: number;
  iec_no: string;
  gst_no: string;
  port_code: string;
  be_date: string;
  packages: number;
  gross_weight: string;
  exchange_rate: number;
  invoices: number;
}

// BOE Records Data Interface
interface IBoeRecordData {
  be_no: string;
  year: number;
  iec_no: string;
  gst_no: string;
  port_code: string;
  be_date: string;
  packages: number;
  gross_weight: string;
  exchange_rate: number;
  invoices: number;
}

// BOE Records Data Interface
interface IBoeRecordData {
  be_no: string;
  year: number;
  iec_no: string;
  gst_no: string;
  port_code: string;
  be_date: string;
  packages: number;
  gross_weight: string;
  exchange_rate: number;
  invoices: number;
}

const DUMMY_DUTY_TREND_DATA = [
  { label: "JNPT", value: 1250, color: CHART_COLORS[0] },
  { label: "FSPL", value: 980, color: CHART_COLORS[1] },
  { label: "ICCT", value: 750, color: CHART_COLORS[2] },
  { label: "NSICT", value: 620, color: CHART_COLORS[3] },
  { label: "IICCT", value: 450, color: CHART_COLORS[4] },
];

const DUMMY_SPLIT_DATA = [
  { label: "Basic Customs Duty", value: 4250, color: CHART_COLORS[0] },
  { label: "Social Welfare Surcharge", value: 425, color: CHART_COLORS[1] },
  { label: "IGST", value: 8925, color: CHART_COLORS[2] },
  { label: "Penalty/Interest/Fine", value: 150, color: CHART_COLORS[3] },
];

const DUMMY_HSN_DATA: IHsnData[] = [
  {
    rank: 1,
    hsn_code: "8471.30.00",
    description: "Portable automatic data processing machines",
    no_of_entries: 342,
    assessable_value: 85.6,
    duty: 22.45,
  },
  {
    rank: 2,
    hsn_code: "8517.12.00",
    description: "Telephones for cellular networks",
    no_of_entries: 287,
    assessable_value: 72.3,
    duty: 18.92,
  },
  {
    rank: 3,
    hsn_code: "9018.90.99",
    description: "Medical instruments and appliances",
    no_of_entries: 256,
    assessable_value: 68.4,
    duty: 17.1,
  },
  {
    rank: 4,
    hsn_code: "8542.31.00",
    description: "Electronic integrated circuits - Processors",
    no_of_entries: 198,
    assessable_value: 54.2,
    duty: 14.35,
  },
  {
    rank: 5,
    hsn_code: "8708.29.00",
    description: "Parts and accessories of motor vehicles",
    no_of_entries: 176,
    assessable_value: 48.9,
    duty: 12.8,
  },
  {
    rank: 6,
    hsn_code: "3004.90.99",
    description: "Medicaments - Other",
    no_of_entries: 154,
    assessable_value: 42.1,
    duty: 11.2,
  },
  {
    rank: 7,
    hsn_code: "8473.30.00",
    description: "Parts for data processing machines",
    no_of_entries: 132,
    assessable_value: 36.8,
    duty: 9.65,
  },
  {
    rank: 8,
    hsn_code: "7208.51.00",
    description: "Flat-rolled products of iron or steel",
    no_of_entries: 118,
    assessable_value: 32.4,
    duty: 8.5,
  },
  {
    rank: 9,
    hsn_code: "8504.40.00",
    description: "Static converters",
    no_of_entries: 95,
    assessable_value: 26.7,
    duty: 7.1,
  },
  {
    rank: 10,
    hsn_code: "8528.72.00",
    description: "Reception apparatus for television",
    no_of_entries: 82,
    assessable_value: 22.5,
    duty: 5.95,
  },
];

const DUMMY_BOE_RECORDS_DATA: IBoeRecordData[] = [
  {
    be_no: "ICCT/2026/164731",
    year: 2022,
    iec_no: "E5C4G8B72D",
    gst_no: "01B2D7FC45F51Z52",
    port_code: "JNPT",
    be_date: "2025-04-15",
    packages: 141,
    gross_weight: "7.67k",
    exchange_rate: 81.68,
    invoices: 2,
  },
  {
    be_no: "NSICT/2026/210497",
    year: 2022,
    iec_no: "3A07B0D3B0",
    gst_no: "10F092C6FA0E1Z51",
    port_code: "FSPL",
    be_date: "2025-03-30",
    packages: 203,
    gross_weight: "16.29k",
    exchange_rate: 72.9,
    invoices: 1,
  },
  {
    be_no: "ICCT/2026/221588",
    year: 2023,
    iec_no: "8D3D60F093",
    gst_no: "1774F0A0A7HD1Z51",
    port_code: "ICCT",
    be_date: "2025-03-18",
    packages: 249,
    gross_weight: "12.07k",
    exchange_rate: 81.91,
    invoices: 2,
  },
  {
    be_no: "ICCT/2026/359879",
    year: 2022,
    iec_no: "4D4A5908G6",
    gst_no: "141A5HA6H3C61Z53",
    port_code: "ICCT",
    be_date: "2025-02-22",
    packages: 162,
    gross_weight: "5.76k",
    exchange_rate: 79.58,
    invoices: 2,
  },
  {
    be_no: "ICCT/2026/292841",
    year: 2022,
    iec_no: "06D7H6HD68",
    gst_no: "183C2A6DH1H81Z53",
    port_code: "NSICT",
    be_date: "2025-08-08",
    packages: 180,
    gross_weight: "4.30k",
    exchange_rate: 82.37,
    invoices: 2,
  },
  {
    be_no: "ICCT/2026/212737",
    year: 2022,
    iec_no: "095AE497H0",
    gst_no: "13H7C6198HD71Z53",
    port_code: "NSICT",
    be_date: "2025-05-21",
    packages: 37,
    gross_weight: "23.95k",
    exchange_rate: 70.15,
    invoices: 1,
  },
  {
    be_no: "JNPT/2026/100086",
    year: 2022,
    iec_no: "6H5E0G90G6",
    gst_no: "164A17A1A7C31Z52",
    port_code: "FSPL",
    be_date: "2025-07-27",
    packages: 123,
    gross_weight: "18.76k",
    exchange_rate: 72.41,
    invoices: 5,
  },
  {
    be_no: "JNPT/2026/469596",
    year: 2020,
    iec_no: "5D1D6F29D5",
    gst_no: "187F8A13D8F41Z54",
    port_code: "ICCT",
    be_date: "2025-04-13",
    packages: 197,
    gross_weight: "6.26k",
    exchange_rate: 79.43,
    invoices: 1,
  },
];

// Number formatting utility for HSN table
const formatCurrency = (value: number): string => {
  return `₹${value.toFixed(2)} Cr`;
};

const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

const HSN_COLUMNS: Column<IHsnData>[] = [
  {
    id: "rank",
    header: "Rank",
    accessor: "rank",
    size: 80,
    minSize: 80,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "600", color: CHART_COLORS[0] }}>{getValue()}</span>
    ),
  },
  {
    id: "hsn_code",
    header: "HSN Code",
    accessor: "hsn_code",
    size: 120,
    minSize: 120,
    cell: ({ getValue }) => (
      <span style={{ fontFamily: "monospace", fontWeight: "500" }}>
        {getValue()}
      </span>
    ),
  },
  {
    id: "description",
    header: "Description",
    accessor: "description",
    size: 300,
    minSize: 200,
    cell: ({ getValue }) => (
      <span style={{ color: "#374151" }}>{getValue()}</span>
    ),
  },
  {
    id: "no_of_entries",
    header: "No. of Entries",
    accessor: "no_of_entries",
    size: 120,
    minSize: 120,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500" }}>{formatNumber(getValue())}</span>
    ),
  },
  {
    id: "assessable_value",
    header: "Assessable Value",
    accessor: "assessable_value",
    size: 140,
    minSize: 140,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500", color: "#059669" }}>
        {formatCurrency(getValue())}
      </span>
    ),
  },
  {
    id: "duty",
    header: "Duty",
    accessor: "duty",
    size: 120,
    minSize: 120,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500", color: "#dc2626" }}>
        {formatCurrency(getValue())}
      </span>
    ),
  },
];

const BOE_RECORDS_COLUMNS: Column<IBoeRecordData>[] = [
  {
    id: "be_no",
    header: "BE No",
    accessor: "be_no",
    size: 160,
    minSize: 160,
    cell: ({ getValue }) => (
      <span
        style={{ fontFamily: "monospace", fontWeight: "600", color: CHART_COLORS[0] }}
      >
        {getValue()}
      </span>
    ),
  },
  {
    id: "year",
    header: "Year",
    accessor: "year",
    size: 80,
    minSize: 80,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500" }}>{getValue()}</span>
    ),
  },
  {
    id: "iec_no",
    header: "IEC No",
    accessor: "iec_no",
    size: 130,
    minSize: 130,
    cell: ({ getValue }) => (
      <span style={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
        {getValue()}
      </span>
    ),
  },
  {
    id: "gst_no",
    header: "GST No",
    accessor: "gst_no",
    size: 150,
    minSize: 150,
    cell: ({ getValue }) => (
      <span style={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
        {getValue()}
      </span>
    ),
  },
  {
    id: "port_code",
    header: "Port Code",
    accessor: "port_code",
    size: 100,
    minSize: 100,
    cell: ({ getValue }) => {
      const getPortColor = (port: string) => {
        const colors: Record<string, string> = {
          JNPT: CHART_COLORS[0],
          FSPL: CHART_COLORS[1],
          ICCT: CHART_COLORS[2],
          NSICT: CHART_COLORS[3],
          IICCT: CHART_COLORS[4],
        };
        return colors[port] || "#6b7280";
      };

      return (
        <span
          style={{
            fontWeight: "600",
            color: getPortColor(getValue()),
            backgroundColor: `${getPortColor(getValue())}15`,
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.875rem",
          }}
        >
          {getValue()}
        </span>
      );
    },
  },
  {
    id: "be_date",
    header: "BE Date",
    accessor: "be_date",
    size: 110,
    minSize: 110,
    cell: ({ getValue }) => (
      <span style={{ color: "#6b7280" }}>
        {new Date(getValue()).toLocaleDateString("en-IN")}
      </span>
    ),
  },
  {
    id: "packages",
    header: "Packages",
    accessor: "packages",
    size: 100,
    minSize: 100,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500" }}>{formatNumber(getValue())}</span>
    ),
  },
  {
    id: "gross_weight",
    header: "Gross Weight",
    accessor: "gross_weight",
    size: 120,
    minSize: 120,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500", color: "#059669" }}>{getValue()}</span>
    ),
  },
  {
    id: "exchange_rate",
    header: "Exchange Rate",
    accessor: "exchange_rate",
    size: 120,
    minSize: 120,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: "500", color: "#dc2626" }}>
        {getValue().toFixed(2)}
      </span>
    ),
  },
  {
    id: "invoices",
    header: "Invoices",
    accessor: "invoices",
    size: 90,
    minSize: 90,
    cell: ({ getValue }) => (
      <span
        style={{
          fontWeight: "600",
          backgroundColor: "#f3f4f6",
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "0.875rem",
        }}
      >
        {getValue()}
      </span>
    ),
  },
];

function AccountsPage() {
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
            title: "Number of BOE",
            icon: <i className="las la-home" />,
            primaryContent: <Count value={2450} />,
            color: "#667eea",
          },
          {
            title: "Assessable Value",
            icon: <i className="las la-dollar-sign" />,
            primaryContent: (
              <>
                <Count value={728} />
                &nbsp;Cr
              </>
            ),
            color: "#4facfe",
          },
          {
            title: "Total Duty Paid",
            icon: <i className="las la-coins" />,
            primaryContent: (
              <>
                <Count value={193} />
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
          height: "420px",
        }}
      >
        <Card
          title="Duty Trend"
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
            <p>Distribution of Bill of Entry submissions across major ports</p>
            <div
              style={{
                flex: 1,
                height: "100%",
              }}
            >
              <BarChart
                data={DUMMY_DUTY_TREND_DATA}
                margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
                showLabels={true}
                animate={true}
              />
            </div>
          </div>
        </Card>

        <Card
          title="Duty Split"
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
            <p>
              Breakdown of duty components across all Bill of Entry submissions
            </p>
            <div
              style={{
                flex: 1,
              }}
            >
              <PieChart
                data={DUMMY_SPLIT_DATA}
                showLabels={false}
                animate={true}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card title="HSN Split" className="mt-4">
        <p>Top 10 HSN codes by volume and value</p>
        <Table<IHsnData>
          className="mt-4"
          columns={HSN_COLUMNS}
          data={DUMMY_HSN_DATA}
        />
      </Card>

      <Card title="BOE Records" className="mt-4">
        <p>Recent Bill of Entry submissions and their details</p>
        <Table<IBoeRecordData>
          className="mt-4"
          columns={BOE_RECORDS_COLUMNS}
          data={DUMMY_BOE_RECORDS_DATA}
        />
      </Card>
    </div>
  );
}

export default AccountsPage;
