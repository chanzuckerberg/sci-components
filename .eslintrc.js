// https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // Specifies the ESLint parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "airbnb-typescript",
    "plugin:sonarjs/recommended",
    "plugin:jest-playwright/recommended",
    "plugin:prettier/recommended", // This always needs to be the last configuration in the extends array
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react", "sonarjs"],
  rules: {
    "react/jsx-no-target-blank": 0,
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "React.FC": {
            message:
              "Use implicit return type, define props as parameters instead. More: https://github.com/facebook/create-react-app/pull/8177",
            fixWith: "React.FC",
          },
        },
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.stories.ts", "**/*.stories.tsx"] },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
