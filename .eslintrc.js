// https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project
const path = require("path");

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  // Specifies the ESLint parser
  extends: [
    "plugin:import/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "airbnb-typescript",
    "plugin:sonarjs/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  // Excludes config files from linting
  ignorePatterns: ["rollup.config.mjs"],
  // this is to disable
  // no-unused-var, no-extraneous-dependencies and prettier
  // rules in all ComponentName.namespace.tsx files
  overrides: [
    {
      files: ["packages/**/src/core/**/*.namespace-test.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "import/no-extraneous-dependencies": "off",
        "prettier/prettier": "off",
      },
    },
    {
      files: ["**/*.cjs"],
      parserOptions: {
        sourceType: "script",
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    // Allows for the use of imports
    project: "./tsconfig.json",
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "sonarjs", "jest", "jsx-a11y"],
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
    "@typescript-eslint/no-use-before-define": "off",
    "consistent-return": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-anonymous-default-export": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        // Dependencies must be specified in `devDependencies` or `peerDependencies` in the monorepo root or individual packages
        devDependencies: true,
        includeInternal: true,
        packageDir: [
          __dirname,
          path.resolve(__dirname, "./packages/components"),
          path.resolve(__dirname, "./packages/data-viz"),
        ],
        peerDependencies: true,
      },
    ],
    "import/prefer-default-export": "off",
    // (thuang): Disable this line for `@typescript-eslint/no-unused-vars` to work
    "no-unused-vars": "off",
    "react/display-name": "off",
    "react/jsx-no-target-blank": "off",
    "react/jsx-props-no-spreading": "off",
    // (thuang): Disable this since we use TypeScript
    "react/jsx-uses-react": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    // (thuang): DefaultProps is being deprecated
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/
    "react/require-default-props": "off",
    // (thuang): We use nested template literals in @emotion extensively
    "sonarjs/no-nested-template-literals": "off",
    // "sort-keys": [
    //   "error",
    //   "asc",
    //   {
    //     caseSensitive: true,
    //     minKeys: 2,
    //     natural: false,
    //   },
    // ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
