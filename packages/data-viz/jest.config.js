/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.svg$": "svg-jest",
  },
};
