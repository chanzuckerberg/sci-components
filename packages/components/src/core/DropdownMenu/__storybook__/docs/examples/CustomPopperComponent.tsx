// DropdownMenu with custom Popper component

import { useEffect, useRef, useState } from "react";
import { Popper, styled } from "@mui/material";
import {
  DropdownMenu,
  DefaultAutocompleteOption,
  Borders,
  CommonThemeProps,
  Corners,
  Shadows,
  Spaces,
} from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Menu item 1",
  },
  {
    name: "Menu item 2",
  },
  {
    name: "Menu item 3",
  },
  {
    name: "Longer menu item than the others",
  },
];

// Step 1/3: Copy existing base styles for the Popper component from
// sci-components/packages/components/src/core/DropdownMenu/style.ts, ~lines 206-229:
const getBorders = ({ theme }: CommonThemeProps): Borders | null => {
  return theme?.app?.borders || null;
};

const getCorners = ({ theme }: CommonThemeProps): Corners | null => {
  return theme?.app?.corners || null;
};

const getShadows = ({ theme }: CommonThemeProps): Shadows | null => {
  return theme?.app?.shadows || null;
};

const getSpaces = ({ theme }: CommonThemeProps): Spaces | null => {
  return theme?.app?.spacing || null;
};

const CustomPopper = styled(Popper)`
  .MuiAutocomplete-popperDisablePortal {
    position: relative;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;
  }

  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      background-color: white;
      border: ${borders?.base?.divider};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      padding: ${spacings?.xs}px;
      box-sizing: border-box;
      z-index: 1400;
    `;
  }}

  border-color: purple;
  border-style: dotted;
  border-width: 15px !important;
`;

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          onClickAway={function handleClickAway() {}}
          open
          options={MENU_ITEMS}
          // Step 3/3: Pass the new CustomPopper to PopperComponent prop
          PopperComponent={CustomPopper}
        />
      )}
    </div>
  );
}

export default App;
