import { IBoeHeader } from "@/types/data";

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
  updating: boolean;
  error: string | null;
  noData: boolean;
  mutate: (data?: any) => Promise<any>;
}
