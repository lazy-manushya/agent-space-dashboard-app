export interface IBoeHeaderMetadata {
  years: string[];
  portCodes: string[];
  invoices: number[];
  items: number[];
  grossWeights: number[];
  exchangeRates: number[];
}

export interface IUseBoeHeadersMetadataReturn {
  metadata: IBoeHeaderMetadata | null;
  loading: boolean;
  error: string | null;
}
