import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// DropdownMenu with customized \`isOptionEqualToValue\`

import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";
import styled from "@emotion/styled";

type MenuItem = DefaultAutocompleteOption & { id: string };

function optionIdEqualToValueId(option: MenuItem, value: MenuItem) {
  return option.id === value.id;
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: "Menu item 1",
    id: "one",
  },
  {
    name: "Menu item 2",
    id: "two",
  },
  {
    name: "Menu item 3",
    id: "three",
  },
  {
    name: "Longer menu item than the others",
    id: "four",
  },
];

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

const Anchor = styled.div\`
  position: absolute;
  top: 12px;
  left: 20px;
\`;

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <Anchor ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu<MenuItem, false, false, false>
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          isOptionEqualToValue={optionIdEqualToValueId}
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
`}))();export{t as default};