import {
  generateBoeHeaderArray,
  generateMetadata,
} from "@/utils/dataGenerator";
import type { IBoeHeader, IMetadata } from "@/types/data";

const FIXED_SEED = 42;
const MASTER_DATASET_SIZE = 1000;

let cachedMasterDataset: IBoeHeader[] | null = null;
let cachedMetadata: IMetadata | null = null;

export function getMasterDataset(): IBoeHeader[] {
  if (!cachedMasterDataset) {
    cachedMasterDataset = generateBoeHeaderArray(
      MASTER_DATASET_SIZE,
      FIXED_SEED,
    );
  }
  return cachedMasterDataset;
}

export function getMasterMetadata(): IMetadata {
  if (!cachedMetadata) {
    const masterDataset = getMasterDataset();
    cachedMetadata = generateMetadata(masterDataset);
  }
  return cachedMetadata;
}

export function clearMasterDatasetCache(): void {
  cachedMasterDataset = null;
  cachedMetadata = null;
}

export async function fetchBoeHeadersMetadata(): Promise<IMetadata> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return getMasterMetadata();
}

export function getFixedSeed(): number {
  return FIXED_SEED;
}

export function getMasterDatasetSize(): number {
  return MASTER_DATASET_SIZE;
}
