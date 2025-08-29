// .storybook/manager.js
import React from "react";
import { addons } from "storybook/manager-api";
import sdsTheme from "./sds-theme";
import { defaultConfig, renderLabel } from "storybook-addon-tag-badges";

addons.setConfig({
  theme: sdsTheme,
  tagBadges: [
    // Custom badge for new components
    {
      tags: "new",
      badge: {
        text: "New",
        style: {
          backgroundColor: "#ebf9ed",
          borderColor: "#105b2b",
          borderRadius: 2,
          color: "#105b2b",
          padding: "4px 6px",
        },
        tooltip:
          "This component is newly added! Please review and provide feedback.",
      },
    },
    // Custom badge for stable components
    {
      tags: "stable",
      badge: {
        text: "Stable",
        style: {
          backgroundColor: "#ECF5F0",
          borderColor: "#3CB371",
          borderRadius: 2,
          color: "#349A61",
          padding: "4px 6px",
        },
        tooltip: "This component is stable and ready for production use",
      },
    },
    // Custom badge for beta components
    {
      tags: "beta",
      badge: {
        text: "Beta",
        style: {
          backgroundColor: "#F4F0F9",
          borderColor: "#7A41CE",
          borderRadius: 2,
          color: "#703CBE",
          padding: "4px 6px",
        },
        tooltip: "This component is in beta and may have breaking changes",
      },
    },
    // Custom badge for deprecated components
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        style: {
          backgroundColor: "#FEF2F2",
          borderColor: "#DC132C",
          borderRadius: 2,
          color: "#C61128",
          padding: "4px 6px",
        },
        tooltip:
          "This component is deprecated and will be removed in a future version",
      },
    },
    // Custom badge for needs revision
    {
      tags: "needs-revision",
      badge: {
        text: "Needs Revision",
        style: {
          backgroundColor: "#F8F8F8",
          borderColor: "#999999",
          borderRadius: 2,
          color: "#767676",
          padding: "4px 6px",
        },
        tooltip: "This component needs revision before production use",
      },
    },
    // Custom badge for work in progress
    {
      tags: "wip",
      badge: {
        text: "Work in Progress",
        style: {
          backgroundColor: "#FCF6EC",
          borderColor: "#F5A623",
          borderRadius: 2,
          color: "#D8921F",
          padding: "4px 6px",
        },
        tooltip: "This component is a work in progress",
      },
    },
    // Include default badges for any other tags
    ...defaultConfig,
  ],
});
