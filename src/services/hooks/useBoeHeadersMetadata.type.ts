export interface IBoeHeaderMetadata {
  years: string[];
  portCodes: string[];
  packages: number[];
  invoices: number[];
  items: number[];
}

export interface IUseBoeHeadersMetadataReturn {
  metadata: IBoeHeaderMetadata | null;
  loading: boolean;
  error: string | null;
}
