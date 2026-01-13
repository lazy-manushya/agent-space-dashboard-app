// Utility to compare two paths for navigation highlighting
// Handles trailing slashes and case sensitivity
export function isPathActive(itemPath: string, activePath: string): boolean {
  if (!itemPath || !activePath) return false;

  // Remove trailing slashes for comparison
  const normalize = (p: string) => p.replace(/\/$/, "").toLowerCase();
  return normalize(itemPath) === normalize(activePath);
}
