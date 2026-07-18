import { MenuList } from "@mui/material";
import { Args } from "@storybook/react-vite";
import RawMenuItem from "@components/src/core/MenuItem";
import { DemoWrapper } from "../style";

export const MenuItem = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <DemoWrapper>
      {/* (v9): MUI MenuItem requires a Menu/MenuList context. */}
      <MenuList disablePadding>
        <RawMenuItem data-testid="MenuItem" {...props}>
          {name}
        </RawMenuItem>
      </MenuList>
    </DemoWrapper>
  );
};
