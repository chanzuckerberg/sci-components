export interface ZeroheightConfig {
  apiKey: string;
  apiClient: string;
  styleguideId: string;
  baseUrl: string;
  outputDir: string;
  format: "markdown" | "html";
}

export const getZeroheightConfig = (): ZeroheightConfig => {
  const config: ZeroheightConfig = {
    apiKey: process.env.ZEROHEIGHT_API_KEY || "",
    apiClient: process.env.ZEROHEIGHT_API_CLIENT || "",
    styleguideId: process.env.ZEROHEIGHT_STYLEGUIDE_ID || "",
    baseUrl: "https://zeroheight.com/open_api/v2",
    outputDir: "./data/zeroheight-exports",
    format:
      (process.env.ZEROHEIGHT_FORMAT as "markdown" | "html") || "markdown",
  };

  // Validate required environment variables
  if (!config.apiKey) {
    throw new Error("ZEROHEIGHT_API_KEY environment variable is required");
  }
  if (!config.apiClient) {
    throw new Error("ZEROHEIGHT_API_CLIENT environment variable is required");
  }
  if (!config.styleguideId) {
    throw new Error(
      "ZEROHEIGHT_STYLEGUIDE_ID environment variable is required"
    );
  }

  return config;
};
