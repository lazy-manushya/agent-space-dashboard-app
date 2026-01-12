import { IBoeHeader } from "@/pages_lib/DashboardPage/DashboardPage.types";

export interface IFetchBoeHeadersParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Record<string, string | number>;
}

export interface IFetchBoeHeadersResponse {
  data: IBoeHeader[];
  total: number;
  page: number;
  limit: number;
}
