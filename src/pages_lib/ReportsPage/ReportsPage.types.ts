export interface IReportsPageProps {
  className?: string;
}

export interface StatCardData {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color: string;
}

export interface ReportConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  statCards: StatCardData[];
}

export type ReportType = 
  | 'duty-report'
  | 'monthly-bond-report' 
  | 'rodtep-report'
  | 'audit-report'
  | 'accounts-report';