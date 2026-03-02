/**
 * Centralized color palette for charts across the application.
 * Colors extracted from the main design system SVG components.
 */

export const CHART_COLORS = [
  '#2563eb', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber/Yellow
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#ec4899', // Pink
] as const;

/**
 * Get a color from the palette by index, with automatic cycling
 * @param index - The index of the color to retrieve
 * @returns The color hex string
 */
export const getChartColor = (index: number): string => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

/**
 * Generate a color array for a specific number of data points
 * @param count - Number of colors needed
 * @returns Array of color hex strings
 */
export const getChartColors = (count: number): string[] => {
  return Array.from({ length: count }, (_, index) => getChartColor(index));
};