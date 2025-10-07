import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import RawNavigationHeader from "src/core/NavigationHeader";

export const TestDemo = (props: Args): JSX.Element => {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");

  return (
    <RawNavigationHeader
      data-testid="navigation-header"
      title="Title"
      activePrimaryNavKey={activePrimaryNavKey}
      setActivePrimaryNavKey={setActivePrimaryNavKey}
      showSearch={false}
      {...props}
    />
  );
};
