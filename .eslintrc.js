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
    // Allows for the use of imports
    project: "./tsconfig.json",
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "sonarjs"],
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "React.FC": {
            fixWith: "React.FC",
            message:
              "Use implicit return type, define props as parameters instead. More: https://github.com/facebook/create-react-app/pull/8177",
          },
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.stories.ts", "**/*.stories.tsx"],
      },
    ],
    "import/prefer-default-export": "off",
    // (thuang): Disable this line for `@typescript-eslint/no-unused-vars` to work
    "no-unused-vars": "off",
    "react/jsx-no-target-blank": 0,
    "react/jsx-props-no-spreading": 0,
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
