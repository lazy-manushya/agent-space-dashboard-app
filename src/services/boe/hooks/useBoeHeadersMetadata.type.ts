import { IMetadata } from "@/types/data";

export interface IUseBoeHeadersMetadataReturn {
  metadata: IMetadata | null;
  loading: boolean;
  error: string | null;
}
