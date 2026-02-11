// Utility functions for formatting numbers and decimals
export const formatNumber = (value: number | undefined, maxDecimals: number = 2): string => {
  if (value === undefined || value === null) return "-";
  if (value >= 1000000) {
    return (value / 1000000).toFixed(maxDecimals) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(maxDecimals) + "k";
  }
  return Number(value.toFixed(maxDecimals)).toLocaleString();
};

export const formatDecimal = (value: number | undefined, maxDecimals: number = 2): string => {
  if (value === undefined || value === null) return "-";
  return Number(value.toFixed(maxDecimals)).toLocaleString();
};
