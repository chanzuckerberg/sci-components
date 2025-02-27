import { useTheme } from "@mui/material";
import { Args } from "@storybook/react";
import { useState } from "react";
import RawMenuItem from "src/core/MenuItem";
import { getSemanticColors } from "src/core/styles";
import RawNavigationHeader from "src/core/NavigationHeader";

export const MenuItem = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <RawMenuItem data-testid="MenuItem" {...props}>
      {name}
    </RawMenuItem>
  );
};

export const CustomNavigationLogo = (): JSX.Element => {
  const theme = useTheme();
  const colors = getSemanticColors({ theme });

  return (
    <div
      style={{
        alignItems: "center",
        border: `1px dashed ${colors?.base.borderPrimary}`,
        display: "flex",
        fontSize: 10,
        fontWeight: "normal",
        height: 24,
        justifyContent: "center",
        width: 50,
      }}
    >
      Logo slot
    </div>
  );
};

export const NavigationHeader = (props: Args): JSX.Element => {
  const { title, ...rest } = props;
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");

  return (
    <RawNavigationHeader
      {...rest}
      title={title}
      activePrimaryNavKey={activePrimaryNavKey}
      setActivePrimaryNavKey={setActivePrimaryNavKey}
    />
  );
};
