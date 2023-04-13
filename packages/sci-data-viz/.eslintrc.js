// https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
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
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
  ],
  // this is to disable
  // no-unused-var, no-extraneous-dependencies and prettier
  // rules in all ComponentName.namespace.tsx files
  overrides: [
    {
      files: ["src/core/**/*.namespace-test.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "import/no-extraneous-dependencies": "off",
        "prettier/prettier": "off",
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
    "import/no-anonymous-default-export": 2,
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: [
          "**/*.stories.ts",
          "**/*.stories.tsx",
          "**/*.test.tsx",
        ],
      },
    ],
    "import/prefer-default-export": "off",
    // (thuang): Disable this line for `@typescript-eslint/no-unused-vars` to work
    "no-unused-vars": "off",
    "react/jsx-no-target-blank": 0,
    "react/jsx-props-no-spreading": 0,
    // (thuang): Disable this since we use TypeScript
    "react/prop-types": "off",
    // (thuang): DefaultProps is being deprecated
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/
    "react/require-default-props": "off",
    // (thuang): We use nested template literals in @emotion extensively
    "sonarjs/no-nested-template-literals": "off",
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
