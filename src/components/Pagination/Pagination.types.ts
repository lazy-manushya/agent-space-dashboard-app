export interface PaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  buttonCount?: number; // How many numbered buttons to show (excluding prev/next/first/last)
  className?: string;
}
