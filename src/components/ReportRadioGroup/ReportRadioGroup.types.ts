export interface ReportOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export interface ReportRadioGroupProps {
  className?: string;
  options: ReportOption[];
  value: string;
  onChange: (value: string) => void;
}