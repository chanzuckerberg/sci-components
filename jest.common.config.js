module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  /**
   * A list of paths to directories that Jest should use to search for files in.
   * The first two paths are the default paths that Jest uses to search for files.
   * The third path specifies the namespace-test files that we want to exclude from the test run.
   * The fourth path specifies the storybook files that we want to exclude from the test run.
   *
   * https://jestjs.io/docs/configuration#testmatch-arraystring
   */
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "!**/__tests__/**/*.namespace-test.[jt]s?(x)",
    "!**/__storybook__/**/*",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "../../fileTransformer.js",
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
          experimental: {
            plugins: [["@swc/plugin-emotion", {}]],
          },
        },
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@storybook|@chanzuckerberg/story-utils|storybook)/)",
  ],
};
