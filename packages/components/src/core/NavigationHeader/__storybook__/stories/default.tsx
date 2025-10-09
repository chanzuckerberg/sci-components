import { Box, Container, useTheme } from "@mui/material";
import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import { getSemanticColors } from "src/core/styles";
import RawNavigationHeader from "src/core/NavigationHeader";
import { EXTRA_LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

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
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("");

  return (
    <>
      <RawNavigationHeader
        {...rest}
        title={title}
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
      />
      <Container>
        <Box>
          {[...new Array(10)].map((_, idx) => (
            <p key={idx}>{EXTRA_LONG_LOREM_IPSUM}</p>
          ))}
        </Box>
      </Container>
    </>
  );
};
