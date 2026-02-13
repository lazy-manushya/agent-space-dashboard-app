import packageJson from "@/../package.json";

export const IS_BROWSER = typeof window !== "undefined";
export const APP_VERSION = packageJson.version;