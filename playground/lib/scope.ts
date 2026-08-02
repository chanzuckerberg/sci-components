import type { ModuleScope } from "./runner";
import * as faker from "@faker-js/faker";
import * as emotionReact from "@emotion/react";
import emotionStyled from "@emotion/styled";
import * as mui from "@mui/material";
import * as muiStyles from "@mui/material/styles";
import * as reactQuery from "@tanstack/react-query";
import * as reactTable from "@tanstack/react-table";
import * as reactVirtual from "@tanstack/react-virtual";
import * as echarts from "echarts";
import * as react from "react";
import * as reactDom from "react-dom";
import * as jsxDevRuntime from "react/jsx-dev-runtime";
import * as jsxRuntime from "react/jsx-runtime";
import * as sds from "@czi-sds/components";
import * as dataViz from "@czi-sds/data-viz";

/**
 * Every module the playground can resolve an import to.
 *
 * The playground compiles in the browser, so there is no bundler to follow an
 * import: a module either sits in this map or it does not exist. The list is
 * the set of packages the documentation examples import, which is what makes
 * "Open in Playground" work on any of them — the count beside each entry is how
 * many of the 218 examples reach for it.
 *
 * Astryx generates the equivalent file, one entry per component, because their
 * package publishes a subpath per component. `@czi-sds/components` is a single
 * barrel, so this stays short enough to keep by hand and read at a glance.
 */
export const scope: ModuleScope = {
  "@czi-sds/components": sds, // 213
  react: { ...react, default: react }, // 89
  "@emotion/styled": { default: emotionStyled, __esModule: true }, // 52
  "@tanstack/react-table": reactTable, // 16
  "@mui/material": mui, // 14
  "@czi-sds/data-viz": dataViz, // 11
  echarts, // 6
  "@faker-js/faker": faker, // 5
  "@mui/material/styles": muiStyles, // 3
  "@tanstack/react-query": reactQuery, // 2
  "@tanstack/react-virtual": reactVirtual, // 1
  "@emotion/react": emotionReact, // 1

  // Not imported by any example, but the compiler emits them for us: the
  // automatic JSX runtime rewrites every tag into a call against one of these.
  "react/jsx-runtime": jsxRuntime,
  "react/jsx-dev-runtime": jsxDevRuntime,
  "react-dom": reactDom,
};
