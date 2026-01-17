import { IBoeHeader } from "@/pages_lib/DashboardPage/DashboardPage.types";

export interface IUseBoeHeadersParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Record<string, string | number> | any;
}

export interface IUseBoeHeadersReturn {
  data: IBoeHeader[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  refetch: (params?: IUseBoeHeadersParams) => Promise<void>;
}
