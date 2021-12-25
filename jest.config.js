/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  transform: {
    "^.+\\.svg$": "svg-jest",
  },
};
