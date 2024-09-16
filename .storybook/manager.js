// .storybook/manager.js
import React from "react";
import { addons } from "@storybook/manager-api";
import sdsTheme from "./sds-theme";
import SidebarItem from "./components/SidebarItem/SidebarItem";

addons.setConfig({
  theme: sdsTheme,
  sidebar: {
    renderLabel: ({ name }) => {
      const statusRegex = /\[([^)]+)]/gi;
      const [statusMatch, statusType] = statusRegex.exec(name) || [];

      if (statusMatch) {
        return (
          <SidebarItem status={statusType}>
            {name.replace(statusMatch, "").trim()}
          </SidebarItem>
        );
      }

      return name;
    },
  },
});
